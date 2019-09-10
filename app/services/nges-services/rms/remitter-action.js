import Service, {inject as service} from '@ember/service';


export default Service.extend({
  store: service(),
  appRestTemplate: service('app-rest-template'),
  serviceInitializer: service('nges-services/service-initializer'),

  apiGatewayHost: config.NGES_SERVICE_HOSTS.GATEWAY_SERVICE_HOST,
  appConfiguration: service('app-configuration'),

  addNewRemitter(accessToken, remitterData) {
    let data = JSON.stringify(remitterData);

    let beforeSend = function (xhr) {
      xhr.setRequestHeader('content-type', 'application/json');
      xhr.setRequestHeader('authorization', 'Bearer ' + accessToken);
    };

    let appCode = this.appConfiguration.getApplicationCode();
    let orgCode = this.appConfiguration.getOrganizationCode();


    let url = this.gatewayServiceHost + "/" + orgCode + "/" + appCode + "/api/remitters";

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

    let appCode = this.appConfiguration.getApplicationCode();
    let orgCode = this.appConfiguration.getOrganizationCode();


    let url = this.gatewayServiceHost + "/" + orgCode + "/" + appCode + "/api/remitters/"+remId;

    return this.appRestTemplate.httpRestClient(url, "PUT",
      data, {}, beforeSend
    );
  },

  getRemitterDataById(remitterId, accessToken) {
    let beforeSend = function (xhr) {
      xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
      xhr.setRequestHeader('authorization', 'Bearer ' + accessToken);
    };

    let appCode = this.appConfiguration.getApplicationCode();
    let orgCode = this.appConfiguration.getOrganizationCode();


    let url = this.gatewayServiceHost + "/" + orgCode + "/" + appCode + "/api/remitters/"+remitterId;

    return this.appRestTemplate.httpRestClient(url, "GET",
      null, {}, beforeSend
    );
  },


});



