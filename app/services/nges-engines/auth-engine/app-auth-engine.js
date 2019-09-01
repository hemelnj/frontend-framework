import Service, {inject as service} from '@ember/service';
import config from 'frontend-engine/config/environment';


export default Service.extend({
  store: service(),
  appRestTemplate: service('app-rest-template'),

  authEngineHost: config.NGES_SERVICE_HOSTS.AUTH_SERVICE_HOST,

  getAllCreatedUsers(accessToken) {
    let beforeSend = function (xhr) {
      xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
      xhr.setRequestHeader('authorization', 'Bearer ' + accessToken);
    };

    let url = this.authEngineHost + "/users";
    return this.appRestTemplate.httpRestClient(url, "GET",
      null, {}, beforeSend
    );
  },

  getAllCreatedRoles(accessToken) {
    let beforeSend = function (xhr) {
      xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
      xhr.setRequestHeader('authorization', 'Bearer ' + accessToken);
    };

    let url = this.authEngineHost + "/roles";
    return this.appRestTemplate.httpRestClient(url, "GET",
      null, {}, beforeSend
    );
  },

  addNewUser(userData, accessToken) {
    let data = JSON.stringify(userData);

    let beforeSend = function (xhr) {
      xhr.setRequestHeader('content-type', 'application/json');
      xhr.setRequestHeader('authorization', 'Bearer ' + accessToken);
    };

    let url = this.authEngineHost + "/users";
    return this.appRestTemplate.httpRestClient(url, "POST",
      data, {}, beforeSend
    );
  },

  addNewRole(roleData, accessToken) {
    let data = JSON.stringify(roleData);

    let beforeSend = function (xhr) {
      xhr.setRequestHeader('content-type', 'application/json');
      xhr.setRequestHeader('authorization', 'Bearer ' + accessToken);
    };

    let url = this.authEngineHost + "/roles";
    return this.appRestTemplate.httpRestClient(url, "POST",
      data, {}, beforeSend
    );
  },

  //////
  getAllEntity(nodeId, accessToken) {
    let beforeSend = function (xhr) {
      xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
      xhr.setRequestHeader('authorization', 'Bearer ' + accessToken);
    };

    let url = this.authEngineHost + "/entities/" + nodeId;
    return this.appRestTemplate.httpRestClient(url, "GET",
      null, {}, beforeSend
    );
  },

  getOrganizationByUserId(userId, accessToken) {
    let beforeSend = function (xhr) {
      xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
      xhr.setRequestHeader('authorization', 'Bearer ' + accessToken);
    };

    let url = this.authEngineHost + "/users/"+userId+"/entities";
    return this.appRestTemplate.httpRestClient(url, "GET",
      null, {}, beforeSend
    );
  },

  getAllApplication(entityId, accessToken) {
    let beforeSend = function (xhr) {
      xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
      xhr.setRequestHeader('authorization', 'Bearer ' + accessToken);
    };

    let url = this.authEngineHost + "/entities/" + entityId + "/applications";
    return this.appRestTemplate.httpRestClient(url, "GET",
      null, {}, beforeSend
    );
  },

  getApplicationByUserIdAndEntityId(entityId, userId, accessToken) {
    let beforeSend = function (xhr) {
      xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
      xhr.setRequestHeader('authorization', 'Bearer ' + accessToken);
    };

    let url = this.authEngineHost  +"/users/"+userId+"/entities/"+entityId+"/applications";
    return this.appRestTemplate.httpRestClient(url, "GET",
      null, {}, beforeSend
    );
  },


  getRoleByUserId(id, accessToken) {
    let beforeSend = function (xhr) {
      xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
      xhr.setRequestHeader('authorization', 'Bearer ' + accessToken);
    };

    let url = this.authEngineHost + '/users/' + id + "/roles";
    return this.appRestTemplate.httpRestClient(url, "GET",
      null, {}, beforeSend
    );
  },
  //////
  requestForResponseToken(refreshToken) {

    let beforeSend = function (xhr) {
      xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
      xhr.setRequestHeader('authorization', 'Basic ' + btoa('USER_CLIENT_APP' + ':' + 'password'));
    };

    let url = this.authEngineHost + "/oauth/token?grant_type=refresh_token&refresh_token=" + refreshToken;

    return this.appRestTemplate.httpRestClient(url, "POST",
      null, {}, beforeSend
    );
  }
});
