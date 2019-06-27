import Service from '@ember/service';
import config from 'frontend-engine/config/environment';
import Authorization from "../mixins/authorization";


let appUserToken = 'appUserToken';
let appRouteKey = 'appRoute';
let menuTree = 'menuTree';
let appExpectedExpireTime = 'appExpectedExpireTime';

export default Service.extend(Authorization, {

  appName: config.APP.appName,
  authEngineHost: config.NGES_SERVICE_HOSTS.AUTH_SERVICE_HOST,

  setAuthorizedUserToken(userTokenInfo) {
    localStorage.setItem(appUserToken, JSON.stringify(userTokenInfo));
  },
  setRouteParams(params) {
    localStorage.setItem(appRouteKey, JSON.stringify(params));
  },
  getRouteParams() {
    let appRoute = localStorage.getItem(appRouteKey);   // get by key

    appRoute = rawDataValidator(appRoute);
    appRoute = (appRoute === null) ? appRoute : JSON.parse(appRoute);

    if (appRoute == null) {
      console.error('appRoute: ', 'appRoute Not Found');
    }
    return appRoute;
  },

  getAuthorizedUserToken() {
    let userTokenInfo = localStorage.getItem(appUserToken);   // get by key

    userTokenInfo = rawDataValidator(userTokenInfo);
    userTokenInfo = (userTokenInfo === null) ? userTokenInfo : JSON.parse(userTokenInfo);

    if (userTokenInfo == null) {
      console.error('getAuthorizedUserToken: ', 'getAuthorizedUserToken Not Found');
    }
    return userTokenInfo;
  },



  getAccessExpireIn() {
    let expires_in = this.getAuthorizedUserToken();

    if (expires_in === undefined) {
      console.error('getAccessToken: ', 'Access ExpireIn Not Found');
      return 0;
    } else if (expires_in === null) {
      console.error('getAccessToken: ', 'Access ExpireIn Not Found');
      return 0
    }
    return expires_in['expires_in'];
  },

  getExpectedTokenExpireTime() {
    let expectedExpireTime = localStorage.getItem(appExpectedExpireTime);
    return expectedExpireTime;
  },

  getCurrentTime() {
    let currentTime = Date.now();
    return currentTime;
  },



  setExpectedTokenExpireTime(tokenExpireIn) {
    let expectedExpireTime = this.getCurrentTime() + (tokenExpireIn * 1000);
    localStorage.setItem(appExpectedExpireTime, expectedExpireTime);
    let context = this;

    setInterval(function () {
      let dif = context.getExpectedTokenExpireTime() - context.getCurrentTime();
      console.log('message-timeDifference', dif);
      if (dif < 100) {
        context.generateTokenUsingRefreshToken().then(function (msg) {
          localStorage.setItem(appUserToken, JSON.stringify(msg));
          let newExpireTime = context.getCurrentTime() + context.getAccessExpireIn()*1000;
          localStorage.setItem(appExpectedExpireTime, newExpireTime);
        }).catch(function (res) {
          context.logoutUser();
          context.clearAuthorization();
        })
      }
    }, 7000);
  },

  getAuthorizedUserInformation() {
    let userInformation = localStorage.getItem(appUserToken);   // get by key
    userInformation = rawDataValidator(userInformation);


    userInformation = (userInformation === null) ? userInformation : JSON.parse(userInformation);
    if (userInformation == null) {

      let routes = window.location.href.split('/');
      if (!routes.includes('') && !routes.includes('/') && !routes.includes('login')) {
        console.error('getAuthorizedUserInformation: ', 'getAuthorizedUserInformation Not Found');
      }


    }
    return userInformation;
  },

  getAccessToken() {
    let accessToken = this.getAuthorizedUserToken().access_token;

    if (accessToken === undefined) {
      console.error('getAccessToken: ', 'User Access Token Not Found');
    } else if (accessToken === null) {
      console.error('getAccessToken: ', 'User Access Token Not Found');
    }
    return accessToken;
  },

  getRefreshToken() {
    let refreshToken = this.getAuthorizedUserToken().refresh_token;
    console.log('message-refreshToken', refreshToken);
    if (refreshToken === undefined) {
      console.error('getRefreshToken: ', 'User Refresh Token Not Found');
    } else if (refreshToken === null) {
      console.error('getRefreshToken: ', 'User Refresh Token Not Found');
    }
    return refreshToken;
  },

  setMenuTreeInformation(menuTreeRawData) {
    localStorage.setItem(menuTree, JSON.stringify(menuTreeRawData));
  },

  getMenuTreeInformation() {

    let menuTreeRawData = localStorage.getItem(menuTree);
    menuTreeRawData = rawDataValidator(menuTreeRawData);
    menuTreeRawData = (menuTreeRawData === null) ? menuTreeRawData : JSON.parse(menuTreeRawData);

    if (menuTreeRawData === null) {
      console.error('getMenuTreeInformation: ', 'getMenuTreeInformation Empty Found');
      return [];
    }
    return menuTreeRawData;
  },


  generateTokenUsingRefreshToken() {

    let context = this;
    let refreshToken = context.getRefreshToken();

    let beforeSend  = function (xhr) {
      xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
      xhr.setRequestHeader('authorization', 'Basic ' + btoa('USER_CLIENT_APP' + ':' + 'password'));
    };

    let url = this.authEngineHost + '/oauth/token?grant_type=refresh_token&refresh_token='+refreshToken;

    return this.appRestTemplate.httpRestClient(url, "POST",
      null, {}, beforeSend
    );

  },

  clearAppInformation() {
    localStorage[menuTree] = null;
    localStorage[appUserToken] = null;
    localStorage[appExpectedExpireTime] = null;
    localStorage[appRouteKey] = null;
  },

  getUserId() {
    let userId = this.getAuthorizedUserToken().id;
    return userId;
  },
  getUserRoleId() {
    let userRoles = this.getAuthorizedUserToken().roles;

    for (let i = 0; i < userRoles.length; i++) {
      if(userRoles[i].name !== 'role_user'){
        return userRoles[i].id;
      }
    }

    /*if (userRoles[0] === undefined) {
      console.error('getUserRoleId: ', 'User Role Not Found');
    }*/
    //return userRole[0].id;
  },

  hasThisRoleByName(roleName) {
    let userRoles = this.getAuthorizedUserToken().roles;

    for (let role of userRoles) {
      if (role.name === roleName) {
        return true;
      }
    }
    return false;
  },

  getUserRoleIdList() {
    let userRoles = this.getAuthorizedUserToken().roles;

    let roles = [];
    userRoles.forEach(function (v, k) {
      roles.push(v.id);
    });

    if (roles === []) {
      console.error('getUserRoleIdList: ', 'User Roles Not Found');
    }
    return roles;
  },

  logoutUser() {
    let accessToken = this.getAccessToken();
    let url = this.authEngineHost + "/oauth/revoke/token?token=" + accessToken;
    return this.appRestTemplate.httpRestClient(url, "POST",
      null, {}, null
    );
  }

});


let rawDataValidator = (userInformation) => {

  if (userInformation === null) {

    return null;
  } else if (userInformation === undefined) {

    return null;
  } else {

    return userInformation;
  }
};
