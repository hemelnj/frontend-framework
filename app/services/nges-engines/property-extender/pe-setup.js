import Service, {inject as service} from '@ember/service';
import config from 'frontend-engine/config/environment';

export default Service.extend({

  store: service(),
  appRestTemplate: service('app-rest-template'),
  olmEngineHost: config.NGES_SERVICE_HOSTS.OLM_SERVICE_HOST,
  rmsOLMEngineHost: config.NGES_SERVICE_HOSTS.RMS_OLM_SERVICE_HOST,
  rmsPEEngineHost: config.NGES_SERVICE_HOSTS.RMS_PE_SERVICE_HOST,


  getAllClassType(accessToken) {

    let beforeSend = function (xhr) {
      xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
      xhr.setRequestHeader('authorization', 'Bearer ' + accessToken);
    };

    //let url = this.olmEngineHost + "/classtypes";
    let url = this.rmsOLMEngineHost + "/classtypes";
    return this.appRestTemplate.httpRestClient(url, "GET",
      null, {}, beforeSend
    );

  },

  getClassTypeById(classTypeId, accessToken) {
    let beforeSend = function (xhr) {
      xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
      xhr.setRequestHeader('authorization', 'Bearer ' + accessToken);
    };

    //let url = this.olmEngineHost + "/classtypes/" + classTypeId;
    let url = this.rmsOLMEngineHost + "/classtypes/" + classTypeId;
    return this.appRestTemplate.httpRestClient(url, "GET",
      null, {}, beforeSend
    );
  },

  getAttributesByClassTypeId(classTypeId, accessToken) {
    let beforeSend = function (xhr) {
      xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
      xhr.setRequestHeader('authorization', 'Bearer ' + accessToken);
    };

    //let url = this.olmEngineHost + "/classtypes/" + classTypeId;
    let url = this.rmsPEEngineHost + "/attributes/" + classTypeId;
    return this.appRestTemplate.httpRestClient(url, "GET",
      null, {}, beforeSend
    );
  },

  addNewProperty(stateData, accessToken) {
    let data = JSON.stringify(stateData);

    let beforeSend = function (xhr) {
      xhr.setRequestHeader('content-type', 'application/json');
      xhr.setRequestHeader('authorization', 'Bearer ' + accessToken);
    };

    //let url = this.olmEngineHost + "/states";
    let url = this.rmsOLMEngineHost + "/states";
    return this.appRestTemplate.httpRestClient(url, "POST",
      data, {}, beforeSend
    );
  }

});
