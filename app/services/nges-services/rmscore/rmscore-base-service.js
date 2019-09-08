import Service, {inject as service} from '@ember/service';
import config from 'frontend-engine/config/environment';

export default Service.extend({
  store: service(),
  appRestTemplate: service('app-rest-template'),
  appConfiguration: service('app-configuration'),

  rmsOLMServiceHost: config.NGES_SERVICE_HOSTS.OLM_SERVICE_HOST,
  gatewayServiceHost: config.NGES_SERVICE_HOSTS.GATEWAY_SERVICE_HOST,
  treeEngineHost: config.NGES_SERVICE_HOSTS.TREE_SERVICE_HOST,


  init() {
    this._super(...arguments);

  },


  getNextAllowableStateId(accessToken, data) {
    data = JSON.stringify(data);

    let beforeSend = function (xhr) {
      xhr.setRequestHeader('content-type', 'application/json');
      xhr.setRequestHeader('authorization', 'Bearer ' + accessToken);
    };

    let url = this.rmsOLMServiceHost + "/states/nextAllowableState";
    return this.appRestTemplate.httpRestClient(url, "POST",
      data, {}, beforeSend
    );
  },

  getDefaultLocationId(accessToken, userId, orgId) {
    let beforeSend = function (xhr) {
      xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
      xhr.setRequestHeader('authorization', 'Bearer ' + accessToken);
    };

    let url = this.treeEngineHost + "/users/" + userId + "/org/"+orgId+"/locationHierarchy";
    return this.appRestTemplate.httpRestClient(url, "GET",
      null, {}, beforeSend
    );
  },

  getDefaultFunctionId(accessToken, userId,orgId) {
    let beforeSend = function (xhr) {
      xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
      xhr.setRequestHeader('authorization', 'Bearer ' + accessToken);
    };

    let url = this.treeEngineHost + "/users/" + userId + "/org/"+orgId+"/functionalHierarchy";
    return this.appRestTemplate.httpRestClient(url, "GET",
      null, {}, beforeSend
    );
  },



})
