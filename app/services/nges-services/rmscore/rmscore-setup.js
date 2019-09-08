import Service, {inject as service} from '@ember/service';
import config from 'frontend-engine/config/environment';

export default Service.extend({
  store: service(),
  appRestTemplate: service('app-rest-template'),
  serviceInitializer: service('nges-services/service-initializer'),
  gatewayServiceHost: config.NGES_SERVICE_HOSTS.GATEWAY_SERVICE_HOST,

  appConfiguration: service('app-configuration'),

  getExchangeHouse(accessToken) {


    let beforeSend = function (xhr) {
      xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
      xhr.setRequestHeader('authorization', 'Bearer ' + accessToken);
    };

    let appCode = this.appConfiguration.getApplicationCode();
    let orgCode = this.appConfiguration.getOrganizationCode();

    //let baseUrl = this.serviceInitializer.getServiceBaseHostURL();
    let url = this.gatewayServiceHost + "/"+orgCode+"/"+appCode+"/api/exchangeHouses";
    return this.appRestTemplate.httpRestClient(url, "GET",
      null, {}, beforeSend
    );
  },
});


