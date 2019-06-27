import Service, {inject as service} from '@ember/service';
import config from 'frontend-engine/config/environment';


export default Service.extend({
  store: service(),
  appRestTemplate: service('app-rest-template'),
  rmsSetup: service('nges-services/rms/rms-setup'),


  getServiceRouteInformation() {
    let routeInfo = this.store.peekRecord('nges-core/engine-route-information', 1);

    if(!routeInfo) routeInfo = this.store.peekRecord('nges-core/engine-route-information', 2);

    return routeInfo;
  },


  addNewRemitter(accessToken, remitterData) {
    let data = JSON.stringify(remitterData);

    let beforeSend = function (xhr) {
      xhr.setRequestHeader('content-type', 'application/json');
      xhr.setRequestHeader('authorization', 'Bearer ' + accessToken);
    };

    let baseUrl = this.rmsSetup.getServiceBaseHostURL();
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

    let baseUrl = this.rmsSetup.getServiceBaseHostURL();
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

    let baseUrl = this.rmsSetup.getServiceBaseHostURL();
    let url = baseUrl + "/remitters/"+remitterId;
    return this.appRestTemplate.httpRestClient(url, "GET",
      null, {}, beforeSend
    );
  },


});



