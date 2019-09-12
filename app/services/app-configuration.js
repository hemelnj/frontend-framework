import Service from '@ember/service';
import config from 'frontend-engine/config/environment';
import Authorization from "../mixins/authorization";

const {computed: {alias}, observer} = Ember;

let appUserToken = 'appUserToken';
let appUserRoles = 'appUserRole';
let appRouteKey = 'appRoute';
let menuTree = 'menuTree';
let orgCode = 'orgCode';
let orgId = 'orgId';
let appCode = 'appCode';
let orgId = 'orgId';
let entityCode = 'entityCode';

let appExpectedExpireTime = 'appExpectedExpireTime';

export default Service.extend(Authorization, {

  appName: config.APP.appName,
  authEngineHost: config.NGES_SERVICE_HOSTS.AUTH_SERVICE_HOST,

  setUserRoles(roleList) {
    localStorage.setItem(appUserRoles, JSON.stringify(roleList));
  },

  getUserRoles() {
    let appRoles = localStorage.getItem(appUserRoles);   // get by key

    appRoles = rawDataValidator(appRoles);
    appRoles = (appRoles === null) ? appRoles : JSON.parse(appRoles);

    if (appRoles == null) {
      console.error('appRoles: ', 'appRoles Not Found');
    }
    return appRoles;
  },

  setEntityCode(code) {
    localStorage.setItem(entityCode, code);
  },

  getEntityCode() {

    let code = localStorage.getItem(entityCode);
    if (code == null) {
      console.error('entityCode: ', 'entityCode Not Found');
    }
    return code;
  },

  setOrganizationCode(organizationCode) {
    localStorage.setItem(orgCode, organizationCode);
  },

  getOrganizationCode() {
    let code = localStorage.getItem(orgCode);
    if (code == null) {
      console.error('orgCode: ', 'orgCode Not Found');
    }
    return code;
  },

<<<<<<< HEAD

=======
>>>>>>> 78119fb543c05ea729ac2f76d3902152ee877d90
  setOrganizationId(organizationId) {
    localStorage.setItem(orgId, organizationId);
  },

  getOrganizationId() {
    let id = localStorage.getItem(orgId);
    if (id == null) {
      console.error('id: ', 'id Not Found');
    }
    return id;
  },

  setApplicationCode(applicationCode) {
    localStorage.setItem(appCode, applicationCode);
  },

  getApplicationCode() {

    let code = localStorage.getItem(appCode);
    if (code == null) {
      console.error('appCode: ', 'appCode Not Found');
    }
    return code;
  },

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
  getRouteURLParams() {
    let url = new URL(window.location.href);
    let entries = new URLSearchParams(url.search);

    let result = {};
    for (let entry of entries) { // each 'entry' is a [key, value] tupple
      const [key, value] = entry;
      result[key] = value;
    }
    return result;
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
      if (dif < 70000) {
        context.generateTokenUsingRefreshToken().then(function (msg) {
          localStorage.setItem(appUserToken, JSON.stringify(msg));
          let newExpireTime = context.getCurrentTime() + context.getAccessExpireIn() * 1000;
          localStorage.setItem(appExpectedExpireTime, newExpireTime);
        }).catch(function (res) {
          context.get('notifier').warning('Failed to fetch token! Try to Sign In again.');
          context.logoutUser();
          context.clearAuthorization();
        })
      }
    }, 8000);
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
    console.log('message-refreshToken taken');
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

    let beforeSend = function (xhr) {
      xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
      xhr.setRequestHeader('authorization', 'Basic ' + btoa('USER_CLIENT_APP' + ':' + 'password'));
    };

    let url = this.authEngineHost + '/oauth/token?grant_type=refresh_token&refresh_token=' + refreshToken;

    return this.appRestTemplate.httpRestClient(url, "POST",
      null, {}, beforeSend
    );

  },

  clearAppInformation() {
    localStorage[menuTree] = null;
    localStorage[appUserToken] = null;
    localStorage[appExpectedExpireTime] = null;
    localStorage[appUserRoles] = null;
    localStorage[appRouteKey] = null;
    localStorage[menuTree] = null;
    localStorage[orgCode] = null;
    localStorage[appCode] = null;
    localStorage[entityCode] = null;
  },

  getUserId() {
    let userId = this.getAuthorizedUserToken().id;
    return userId;
  },
  getUserRoleId() {
    let userRoles = this.getUserRoles();

    for (let i = 0; i < userRoles.length; i++) {
      if (userRoles[i].attributes.name !== 'role_user') {
        return userRoles[i].id;
      }
    }

    /*if (userRoles[0] === undefined) {
      console.error('getUserRoleId: ', 'User Role Not Found');
    }*/
    //return userRole[0].id;
  },

  hasThisRoleByName(roleName) {
    let userRoles = this.getUserRoles();

    for (let role of userRoles) {
      if (role.name === roleName) {
        return true;
      }
    }
    return false;
  },

  getUserRoleIdList() {
    let userRoles = this.getUserRoles();

    let roles = [];
    userRoles.forEach(function (v, k) {
      if(v.id !==18){
        roles.push(v.id);
      }

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
