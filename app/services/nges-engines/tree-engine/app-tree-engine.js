import Service, {inject as service} from '@ember/service';
import config from 'frontend-engine/config/environment';

import ngesServiceConfiguration from '../../../components/nges-services/nges-services-configuration';


export default Service.extend({
  store: service(),
  appRestTemplate: service('app-rest-template'),
  treeEngineHost: config.NGES_SERVICE_HOSTS.TREE_SERVICE_HOST,
  authEngineHost: config.NGES_SERVICE_HOSTS.AUTH_SERVICE_HOST,
  olcmHost: config.NGES_SERVICE_HOSTS.OLM_SERVICE_HOST,
  rmsOLMHost: config.NGES_SERVICE_HOSTS.APP_OLM_SERVICE_HOST,

  getAllClassTypes(accessToken) {
    let beforeSend = function (xhr) {
      xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
      xhr.setRequestHeader('authorization', 'Bearer ' + accessToken);
    };

    //let url = context.olcmHost + '/classtypes';
    let url = this.rmsOLMHost + "/classtypes";
    return this.appRestTemplate.httpRestClient(url, "GET",
      null, {}, beforeSend
    );
  },

  getAllRoles(accessToken) {
    let beforeSend = function (xhr) {
      xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
      xhr.setRequestHeader('authorization', 'Bearer ' + accessToken);
    };

    //let roleDataUrl = this.treeEngineHost + '/roles';
    let url = this.treeEngineHost + '/roles';
    return this.appRestTemplate.httpRestClient(url, "GET",
      null, {}, beforeSend
    );
  },

  getAllUsers(accessToken) {
    let beforeSend = function (xhr) {
      xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
      xhr.setRequestHeader('authorization', 'Bearer ' + accessToken);
    };

    let url = this.authEngineHost + '/users';
    return this.appRestTemplate.httpRestClient(url, "GET",
      null, {}, beforeSend
    );
  },

  getDataContext(accessToken, DataContextURL) {
    let beforeSend = function (xhr) {
      xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
      xhr.setRequestHeader('authorization', 'Bearer ' + accessToken);
    };

    let url = DataContextURL;
    return this.appRestTemplate.httpRestClient(url, "GET",
      null, {}, beforeSend
    );
  },

  getLocationalHierarchyById(userId, accessToken) {
    let beforeSend = function (xhr) {
      xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
      xhr.setRequestHeader('authorization', 'Bearer ' + accessToken);
    };

    let url = this.treeEngineHost + "/users/" + userId + "/locationHierarchy";
    return this.appRestTemplate.httpRestClient(url, "GET",
      null, {}, beforeSend
    );
  },

  getFunctionalHierarchyById(userId, accessToken) {
    let beforeSend = function (xhr) {
      xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
      xhr.setRequestHeader('authorization', 'Bearer ' + accessToken);
    };

    let url = this.treeEngineHost + "/users/" + userId + "/functionalHierarchy";
    return this.appRestTemplate.httpRestClient(url, "GET",
      null, {}, beforeSend
    );
  },


  putDataContext(accessToken, dataContextUpdateUrl, modifiedOnlyTrueDataList) {
    let data = JSON.stringify(modifiedOnlyTrueDataList);

    let beforeSend = function (xhr) {
      xhr.setRequestHeader('content-type', 'application/json');
      xhr.setRequestHeader('authorization', 'Bearer ' + accessToken);
    };

    let url = dataContextUpdateUrl;
    return this.appRestTemplate.httpRestClient(url, "PUT",
      data, {}, beforeSend
    );
  },

  postDataContext(accessToken, requestData) {
    let data = JSON.stringify(requestData);

    let beforeSend = function (xhr) {
      xhr.setRequestHeader('content-type', 'application/json');
      xhr.setRequestHeader('authorization', 'Bearer ' + accessToken);
    };

    let url = this.treeEngineHost + '/users';
    return this.appRestTemplate.httpRestClient(url, "POST",
      data, {}, beforeSend
    );
  },

  getMenuItems(accessToken, menuItemURL) {
    let beforeSend = function (xhr) {
      xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
      xhr.setRequestHeader('authorization', 'Bearer ' + accessToken);
    };

    let url = menuItemURL;
    return this.appRestTemplate.httpRestClient(url, "GET",
      null, {}, beforeSend
    );
  },
  getOLMObjects(accessToken, olmObjectURL) {
    let beforeSend = function (xhr) {
      xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
      xhr.setRequestHeader('authorization', 'Bearer ' + accessToken);
    };

    let url = olmObjectURL;
    return this.appRestTemplate.httpRestClient(url, "GET",
      null, {}, beforeSend
    );
  },

  getOLMObjectWiseStates(accessToken, olmObjectURL) {
    let beforeSend = function (xhr) {
      xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
      xhr.setRequestHeader('authorization', 'Bearer ' + accessToken);
    };

    let url = olmObjectURL;
    return this.appRestTemplate.httpRestClient(url, "GET",
      null, {}, beforeSend
    );
  },
  getSubMenuList(accessToken, olmObjectURL) {
    let beforeSend = function (xhr) {
      xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
      xhr.setRequestHeader('authorization', 'Bearer ' + accessToken);
    };

    let url = olmObjectURL;
    return this.appRestTemplate.httpRestClient(url, "GET",
      null, {}, beforeSend
    );
  },

  postMenuItemToObjectAssignment(accessToken, requestData, requestURL) {
    let data = JSON.stringify(requestData);

    let beforeSend = function (xhr) {
      xhr.setRequestHeader('content-type', 'application/json');
      xhr.setRequestHeader('authorization', 'Bearer ' + accessToken);
    };

    let url = requestURL;
    return this.appRestTemplate.httpRestClient(url, "POST",
      data, {}, beforeSend
    );
  },


  getResourceTemplates() {

    let resourcesList = ngesServiceConfiguration;

    let templateList = [];
    for (let resource of resourcesList) {

      let templates = resource.templates;
      for (let template of templates) {

        templateList.push({

          id: template.code,
          attributes: {
            id: template.code,
            code: template.code,
            name: template.label,
          }
        })
      }

    }
    return templateList;
  }


});
