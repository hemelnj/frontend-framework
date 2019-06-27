import Service, {inject as service} from '@ember/service';
import config from '../../config/environment';


export default Service.extend({

  store: service(),

  appRestTemplate: service('app-rest-template'),
  appConfiguration: service('app-configuration'),
  authEngineHost: config.NGES_SERVICE_HOSTS.AUTH_SERVICE_HOST,
  treeEngineHost: config.NGES_SERVICE_HOSTS.TREE_SERVICE_HOST,

  makeLogin(userInformation) {


    let data = 'grant_type='+ 'password'
      + "&username=" + userInformation.name
      + "&password=" + userInformation.password;


    let beforeSend  = function (xhr) {
      xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
      xhr.setRequestHeader('authorization', 'Basic ' + btoa('USER_CLIENT_APP' + ':' + 'password'));
    };


    let url = this.authEngineHost + '/oauth/token';
    return this.appRestTemplate.httpRestClient(url, "POST",
      data, {}, beforeSend
    );

  },

  makeAdminLogin(userInformation) {

    let data = 'grant_type='+ 'password'
      + "&username="
      + userInformation.name + "&password="
      + userInformation.password;


    let beforeSend  = function (xhr) {
      xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
      xhr.setRequestHeader('authorization', 'Basic ' + btoa('USER_CLIENT_APP' + ':' + 'password'));
      //console.log('message-Authorization', "Basic " + btoa("USER_CLIENT_APP : password"));
    };

    let url = this.authEngineHost + '/oauth/token';
    return this.appRestTemplate.httpRestClient(url, "POST",
      data, {}, beforeSend
    );
  },

  identifyAdmin(accessToken){

    let beforeSend = function (xhr) {
      xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
      xhr.setRequestHeader('authorization', 'Bearer ' + accessToken);
      //console.log('identifyAdmin-token', 'Bearer ' + accessToken);
    };

    let url = this.authEngineHost + '/users';
    return this.appRestTemplate.httpRestClient(url, "GET",
      null, {}, beforeSend
    );
  },

  requestCodeForForgotPassword(userData){

    let data= JSON.stringify(userData);

    let beforeSend = function (xhr) {
      xhr.setRequestHeader('content-type', 'application/json');
    };

    let url = this.authEngineHost + '/users/tempcode';
    return this.appRestTemplate.httpRestClient(url, "POST",
      data, {}, beforeSend
    );
  },

  updatePasswordAfterGettingCode(userData){

    let data= JSON.stringify(userData);

    let beforeSend = function (xhr) {
      xhr.setRequestHeader('content-type', 'application/json');
    };

    let url = this.authEngineHost + "/users/passwordRecover";
    return this.appRestTemplate.httpRestClient(url, "POST",
      data, {}, beforeSend
    );
  },

  singleLogout() {

    let accessToken = this.appConfiguration.getAccessToken();


    let beforeSend  = function (xhr) {
      xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
      xhr.setRequestHeader('authorization', 'Bearer' + accessToken);
    };


    let url = this.authEngineHost + '/oauth/logout';
    return this.appRestTemplate.httpRestClient(url, "POST",
      null, {}, beforeSend
    );

  },



});

