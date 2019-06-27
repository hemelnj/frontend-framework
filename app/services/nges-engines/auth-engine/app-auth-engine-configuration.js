import Service from '@ember/service';
import config from 'frontend-engine/config/environment';

let authEngineToken = 'authEngineToken';

export default Service.extend({

  appName: config.APP.appName,

  setAuthorizedUserToken(userTokenInfo) {
    localStorage.setItem(authEngineToken, JSON.stringify(userTokenInfo));
  },

  getAuthorizedUserToken() {
    let userTokenInfo = localStorage.getItem(authEngineToken);   // get by key

    userTokenInfo = rawDataValidator(userTokenInfo);

    userTokenInfo = (userTokenInfo === null) ? userTokenInfo : JSON.parse(userTokenInfo);

    if (userTokenInfo == null) {
      console.error('getAuthorizedUserToken: ', 'getAuthorizedUserToken Not Found');
    }
    return userTokenInfo;
  },

  getAccessToken() {
    let accessToken = this.getAuthorizedUserToken();

    if (accessToken === undefined) {
      console.error('getAccessToken: ', 'User Access Token Not Found');
    } else if (accessToken === null) {
      console.error('getAccessToken: ', 'User Access Token Not Found');
    }
    return accessToken;
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
