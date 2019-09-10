import Service, {inject as service} from '@ember/service';
import config from 'frontend-engine/config/environment';

export default Service.extend({
  store: service(),
  appRestTemplate: service('app-rest-template'),
  appConfiguration: service('app-configuration'),
  rmsServiceHost: config.NGES_SERVICE_HOSTS.APP_OLM_SERVICE_HOST,
  treeEngineHost: config.NGES_SERVICE_HOSTS.TREE_SERVICE_HOST,
  rmsOLMServiceHost: config.NGES_SERVICE_HOSTS.OLM_SERVICE_HOST,

  init() {
    this._super(...arguments);

  },


  getDefaultLocationId(accessToken, userId, orgId) {
    let beforeSend = function (xhr) {
      xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
      xhr.setRequestHeader('authorization', 'Bearer ' + accessToken);
    };

    let url = this.treeEngineHost + "/users/" + userId + "/org/"+orgId+"/locationHierarchy";
    //let url = this.treeEngineHost + "/users/" + userId + "/locationHierarchy";
    return this.appRestTemplate.httpRestClient(url, "GET",
      null, {}, beforeSend
    );
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

  getDefaultFunctionId(accessToken, userId, orgId) {
    let beforeSend = function (xhr) {
      xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
      xhr.setRequestHeader('authorization', 'Bearer ' + accessToken);
    };

    let url = this.treeEngineHost + "/users/" + userId + "/org/"+orgId+"/functionalHierarchy";
    //let url = this.treeEngineHost + "/users/" + userId + "/functionalHierarchy";
    return this.appRestTemplate.httpRestClient(url, "GET",
      null, {}, beforeSend
    );
  },



})
