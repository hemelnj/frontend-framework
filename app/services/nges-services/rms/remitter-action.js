import Service, {inject as service} from '@ember/service';


export default Service.extend({
  store: service(),
  appRestTemplate: service('app-rest-template'),
  serviceInitializer: service('nges-services/service-initializer'),




  addNewRemitter(accessToken, remitterData) {
    let data = JSON.stringify(remitterData);

    let beforeSend = function (xhr) {
      xhr.setRequestHeader('content-type', 'application/json');
      xhr.setRequestHeader('authorization', 'Bearer ' + accessToken);
    };

    let baseUrl = this.serviceInitializer.getServiceBaseHostURL();
    let url = baseUrl + "/remitters";
    return this.appRestTemplate.httpRestClient(url, "POST",
      data, {}, beforeSend
    );
  },

  updateRemitterData(accessToken, remitterData, remId) {
    let data = JSON.stringify(remitterData);

    let beforeSend = function (xhr) {
      xhr.setRequestHeader('content-type', 'application/json');
      xhr.setRequestHeader('authorization', 'Bearer ' + accessToken);
    };

    let baseUrl = this.serviceInitializer.getServiceBaseHostURL();
    let url = baseUrl + "/remitters/"+remId;
    return this.appRestTemplate.httpRestClient(url, "PUT",
      data, {}, beforeSend
    );
  },

  getRemitterDataById(remitterId, accessToken) {
    let beforeSend = function (xhr) {
      xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
      xhr.setRequestHeader('authorization', 'Bearer ' + accessToken);
    };

    let baseUrl = this.serviceInitializer.getServiceBaseHostURL();
    let url = baseUrl + "/remitters/"+remitterId;
    return this.appRestTemplate.httpRestClient(url, "GET",
      null, {}, beforeSend
    );
  },


});



