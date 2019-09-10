import Service, {inject as service} from '@ember/service';
import config from 'frontend-engine/config/environment';


export default Service.extend({
  store: service(),
  appRestTemplate: service('app-rest-template'),
  serviceInitializer: service('nges-services/service-initializer'),

  apiGatewayHost: config.NGES_SERVICE_HOSTS.GATEWAY_SERVICE_HOST,
  appConfiguration: service('app-configuration'),


  addNewBeneficiary(accessToken, beneficiaryData) {
    let data = JSON.stringify(beneficiaryData);

    let beforeSend = function (xhr) {
      xhr.setRequestHeader('content-type', 'application/json');
      xhr.setRequestHeader('authorization', 'Bearer ' + accessToken);
    };

    let appCode = this.appConfiguration.getApplicationCode();
    let orgCode = this.appConfiguration.getOrganizationCode();


    let url = this.gatewayServiceHost + "/" + orgCode + "/" + appCode + "/api/beneficiaries";

    return this.appRestTemplate.httpRestClient(url, "POST",
      data, {}, beforeSend
    );
  },

  updateBeneficiaryData(accessToken, beneficiaryData, beneficiaryId) {
    let data = JSON.stringify(beneficiaryData);

    let beforeSend = function (xhr) {
      xhr.setRequestHeader('content-type', 'application/json');
      xhr.setRequestHeader('authorization', 'Bearer ' + accessToken);
    };

    let appCode = this.appConfiguration.getApplicationCode();
    let orgCode = this.appConfiguration.getOrganizationCode();

    let url = this.gatewayServiceHost + "/" + orgCode + "/" + appCode + "/api/beneficiaries/"+beneficiaryId;

    return this.appRestTemplate.httpRestClient(url, "PUT",
      data, {}, beforeSend
    );
  },

  getBeneficiaryDataById(beneficiaryId, accessToken) {
    let beforeSend = function (xhr) {
      xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
      xhr.setRequestHeader('authorization', 'Bearer ' + accessToken);
    };

    let appCode = this.appConfiguration.getApplicationCode();
    let orgCode = this.appConfiguration.getOrganizationCode();

    let url = this.gatewayServiceHost + "/" + orgCode + "/" + appCode + "/api/beneficiaries/"+beneficiaryId;

    return this.appRestTemplate.httpRestClient(url, "GET",
      null, {}, beforeSend
    );
  }

});

