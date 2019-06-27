import Service, {inject as service} from '@ember/service';
import config from 'frontend-engine/config/environment';

export default Service.extend({
  store: service(),
  appRestTemplate: service('app-rest-template'),
  appConfiguration: service('app-configuration'),
  rmsServiceHost: config.NGES_SERVICE_HOSTS.RMS_OLM_SERVICE_HOST,
  treeEngineHost: config.NGES_SERVICE_HOSTS.TREE_SERVICE_HOST,
  rmsOLMServiceHost: config.NGES_SERVICE_HOSTS.RMS_OLM_SERVICE_HOST,
  appWelcome: service('nges-core/app-welcome'),

  init() {
    this._super(...arguments);

  },

  //------------------------  generate service Host Url base on params
  getServiceBaseHostURL() {
    let routeInfo = this.store.peekRecord('nges-core/engine-route-information', 1);

    if(!routeInfo) routeInfo = this.store.peekRecord('nges-core/engine-route-information', 2);

    let hostUrl = 'http://' + routeInfo.appCode + '.' + routeInfo.appModuleCode + '-apps.115.127.24.184.nip.io';
    return hostUrl;
  },
  getServiceRouteInformation() {
    let routeInfo = this.store.peekRecord('nges-core/engine-route-information', 1);

    if(!routeInfo) routeInfo = this.store.peekRecord('nges-core/engine-route-information', 2);

    return routeInfo;
  },
  //------------------------


  getFindAll(accessToken, data) {
    let serviceCode = this.appWelcome.getServiceOrMenuInformation().serviceCode;
    data = JSON.stringify(data);

    let beforeSend = function (xhr) {
      xhr.setRequestHeader('content-type', 'application/json');
      xhr.setRequestHeader('authorization', 'Bearer ' + accessToken);
    };

    let baseUrl = this.getServiceBaseHostURL();

    let url = baseUrl + "/" + serviceCode + "/findAll";
    return this.appRestTemplate.httpRestClient(url, "POST",
      data, {}, beforeSend
    );
  },

  getClassType(accessToken) {

    let serviceId = this.appWelcome.getServiceOrMenuInformation().serviceId;

    let beforeSend = function (xhr) {
      xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
      xhr.setRequestHeader('authorization', 'Bearer ' + accessToken);
    };

    let url = this.treeEngineHost + "/menuTrees/" + serviceId + "/olmObject";
    return this.appRestTemplate.httpRestClient(url, "GET",
      null, {}, beforeSend
    );
  },

  getUserAbilityToCreate(accessToken, actionEventName, classTypeId, roleId) {
    let beforeSend = function (xhr) {
      xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
      xhr.setRequestHeader('authorization', 'Bearer ' + accessToken);
    };

    //let url = this.olmEngineHost + "/actionevents";
    let url = this.rmsOLMServiceHost + "/actionevents/" + actionEventName + "/classtypes/" + classTypeId + "/roles/" + roleId;
    return this.appRestTemplate.httpRestClient(url, "GET",
      null, {}, beforeSend
    );
  },

  getNextAllowableState(accessToken, payload) {
    payload = JSON.stringify(payload);

    let beforeSend = function (xhr) {
      xhr.setRequestHeader('content-type', 'application/json');
      xhr.setRequestHeader('authorization', 'Bearer ' + accessToken);
    };


    let baseUrl = this.rmsOLMServiceHost + "/states/nextAllowableState";
    return this.appRestTemplate.httpRestClient(baseUrl, "POST",
      payload, {}, beforeSend
    );

  },

  stateActionUpdate(accessToken, id, payload) {

    let serviceCode = this.appWelcome.getServiceOrMenuInformation().serviceCode;
    payload = JSON.stringify(payload);

    let beforeSend = function (xhr) {
      xhr.setRequestHeader('content-type', 'application/json');
      xhr.setRequestHeader('authorization', 'Bearer ' + accessToken);
    };

    let url = this.rmsServiceHost + "/" + serviceCode + "/" + id;          // beneficiaries == microServiceFunctionId
    return this.appRestTemplate.httpRestClient(url, "PATCH",
      payload, {}, beforeSend
    );
  },

  getAllAllowableCrudAction(accessToken, data) {

    data = JSON.stringify(data);

    let beforeSend = function (xhr) {
      xhr.setRequestHeader('content-type', 'application/json');
      xhr.setRequestHeader('authorization', 'Bearer ' + accessToken);
    };

    let url = this.rmsOLMServiceHost + "/crudevents/allAllowableCrudActions";
    return this.appRestTemplate.httpRestClient(url, "POST",
      data, {}, beforeSend
    );
  },

  getStateActions(accessToken, data) {
    data = JSON.stringify(data);

    let beforeSend = function (xhr) {
      xhr.setRequestHeader('content-type', 'application/json');
      xhr.setRequestHeader('authorization', 'Bearer ' + accessToken);
    };

    let url = this.rmsOLMServiceHost + "/actionevents/allAllowableActions";
    return this.appRestTemplate.httpRestClient(url, "POST",
      data, {}, beforeSend
    );
  },

})
