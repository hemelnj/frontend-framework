import Service, {inject as service} from '@ember/service';
import config from 'frontend-engine/config/environment';


export default Service.extend({
  store: service(),
  appRestTemplate: service('app-rest-template'),

  authEngineHost: config.NGES_SERVICE_HOSTS.AUTH_SERVICE_HOST,


  requestCodeForforgotPassword(userdata){
    let data= JSON.stringify(userData);

    let beforeSend = function (xhr) {
      xhr.setRequestHeader('content-type', 'application/json');
    };

    let url = this.authEngineHost + "/users/tempcode";
    return this.appRestTemplate.httpRestClient(url, "POST",
      data, {}, beforeSend
    );
  },

  updatePassword(userData,accessToken){
    let data= JSON.stringify(userData);

    let beforeSend = function (xhr) {
      xhr.setRequestHeader('content-type', 'application/json');
      xhr.setRequestHeader('authorization', 'Bearer ' +accessToken);
    };

    let url = this.authEngineHost + "/users/1";
    return this.appRestTemplate.httpRestClient(url, "PATCH",
      data, {}, beforeSend
    );
  },
  logoutUser(accessToken){
    let url = this.authEngineHost + "/oauth/revoke/token?token=" + accessToken;
    return this.appRestTemplate.httpRestClient(url, "POST",
      null, {}, null
    );
  },
});
