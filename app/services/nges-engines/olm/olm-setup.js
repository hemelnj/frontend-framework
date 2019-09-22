import Service, {inject as service} from '@ember/service';
import config from 'frontend-engine/config/environment';

export default Service.extend({

  store: service(),
  appRestTemplate: service('app-rest-template'),
  //olmEngineHost: config.NGES_SERVICE_HOSTS.OLM_SERVICE_HOST,
  rmsOLMEngineHost: config.NGES_SERVICE_HOSTS.OLM_SERVICE_HOST,
  apiGatewayHost: config.NGES_SERVICE_HOSTS.GATEWAY_SERVICE_HOST,

  getAllActionEvents(accessToken) {
    let beforeSend = function (xhr) {
      xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
      xhr.setRequestHeader('authorization', 'Bearer ' + accessToken);
    };

    //let url = this.olmEngineHost + "/actionevents";
    let url = this.rmsOLMEngineHost + "/actionevents";
    return this.appRestTemplate.httpRestClient(url, "GET",
      null, {}, beforeSend
    );
  },



  addNewActionEvent(actionEventData, accessToken) {
    let data = JSON.stringify(actionEventData);

    let beforeSend = function (xhr) {
      xhr.setRequestHeader('content-type', 'application/json');
      xhr.setRequestHeader('authorization', 'Bearer ' + accessToken);
    };

    //let url = this.olmEngineHost + "/actionevents";
    let url = this.rmsOLMEngineHost + "/actionevents";
    return this.appRestTemplate.httpRestClient(url, "POST",
      data, {}, beforeSend
    );
  },

  updateActionEvent(updatedActionEventData, accessToken, id) {
    let data = JSON.stringify(updatedActionEventData);

    let beforeSend = function (xhr) {
      xhr.setRequestHeader('content-type', 'application/json');
      xhr.setRequestHeader('authorization', 'Bearer ' + accessToken);
    };

    //let url = this.olmEngineHost + "/actionevents/" + id;
    let url = this.rmsOLMEngineHost + "/actionevents/" + id;
    return this.appRestTemplate.httpRestClient(url, "PATCH",
      data, {}, beforeSend
    );
  },

  updateObjectState(updatedStateData, accessToken, id) {
    let data = JSON.stringify(updatedStateData);

    let beforeSend = function (xhr) {
      xhr.setRequestHeader('content-type', 'application/json');
      xhr.setRequestHeader('authorization', 'Bearer ' + accessToken);
    };

    //let url = this.olmEngineHost + "/states/" + id;
    let url = this.rmsOLMEngineHost + "/states/" + id;
    return this.appRestTemplate.httpRestClient(url, "PATCH",
      data, {}, beforeSend
    );
  },

  getAllClassType(orgCode,appCode,engineCode,accessToken) {


    let beforeSend = function (xhr) {
      xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
      xhr.setRequestHeader('authorization', 'Bearer ' + accessToken);
    };
    //let url = this.olmEngineHost + "/classtypes";
    //let url = this.rmsOLMEngineHost + "/classtypes";

    //let url = this.olmEngineHost + "/" + orgCode + "/" + appCode + "/" + engineCode + "/api/classtypes";
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

  addNewState(stateData, accessToken) {
    let data = JSON.stringify(stateData);

    let beforeSend = function (xhr) {
      xhr.setRequestHeader('content-type', 'application/json');
      xhr.setRequestHeader('authorization', 'Bearer ' + accessToken);
    };

    let url = this.olmEngineHost + "/states";
    //let url = this.rmsOLMEngineHost + "/states";
    return this.appRestTemplate.httpRestClient(url, "POST",
      data, {}, beforeSend
    );
  },

  getAllRoles(accessToken) {
    let beforeSend = function (xhr) {
      xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
      xhr.setRequestHeader('authorization', 'Bearer ' + accessToken);
    };

    let url = this.rmsOLMEngineHost + "/roles";
    return this.appRestTemplate.httpRestClient(url, "GET",
      null, {}, beforeSend
    );
  },

  saveDiagram(diagramData){
    let data = JSON.stringify(diagramData);

    let beforeSend = function (xhr) {
      xhr.setRequestHeader('content-type', 'application/json');
    };

    let url = this.rmsOLMEngineHost + '/diagram';
    return this.appRestTemplate.httpRestClient(url, "POST",
      data, {}, beforeSend
    );
  }
});
