import Service, {inject as service} from '@ember/service';
import config from 'frontend-engine/config/environment';


export default Service.extend({
  store: service(),
  appRestTemplate: service('app-rest-template'),
  serviceInitializer: service('nges-services/service-initializer'),

  appConfiguration: service('app-configuration'),

  gatewayServiceHost: config.NGES_SERVICE_HOSTS.GATEWAY_SERVICE_HOST,

  addNewRemittanceCollection(accessToken, remCollectionData) {
    let data = JSON.stringify(remCollectionData);

    let beforeSend = function (xhr) {
      xhr.setRequestHeader('content-type', 'application/json');
      xhr.setRequestHeader('authorization', 'Bearer ' + accessToken);
    };

    let appCode = this.appConfiguration.getApplicationCode();
    let orgCode = this.appConfiguration.getOrganizationCode();


    let url = this.gatewayServiceHost + "/" + orgCode + "/" + appCode + "/api/remittanceTransactions";

    //let url = baseUrl + "/remittanceTransactions";

    return this.appRestTemplate.httpRestClient(url, "POST",
      data, {}, beforeSend
    );
  },


  getCollectionDataById(collectionId, accessToken) {
    let beforeSend = function (xhr) {
      xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
      xhr.setRequestHeader('authorization', 'Bearer ' + accessToken);
    };

    let appCode = this.appConfiguration.getApplicationCode();
    let orgCode = this.appConfiguration.getOrganizationCode();

    let url = this.gatewayServiceHost + "/" + orgCode + "/" + appCode + "/api/remittanceTransactions/"+collectionId;

    return this.appRestTemplate.httpRestClient(url, "GET",
      null, {}, beforeSend
    );
  }

});

