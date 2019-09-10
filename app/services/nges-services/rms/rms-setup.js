import Service, {inject as service} from '@ember/service';
import config from 'frontend-engine/config/environment';

export default Service.extend({
  store: service(),
  appRestTemplate: service('app-rest-template'),
  serviceInitializer: service('nges-services/service-initializer'),
  gatewayServiceHost: config.NGES_SERVICE_HOSTS.GATEWAY_SERVICE_HOST,

  appConfiguration: service('app-configuration'),
  getAllCountries(accessToken) {


    let beforeSend = function (xhr) {
      xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
      xhr.setRequestHeader('authorization', 'Bearer ' + accessToken);
    };

    let appCode = this.appConfiguration.getApplicationCode();
    let orgCode = this.appConfiguration.getOrganizationCode();


    let url = this.gatewayServiceHost + "/"+orgCode+"/"+appCode+"/api/countries";

    //let baseUrl = this.serviceInitializer.getServiceBaseHostURL();

    return this.appRestTemplate.httpRestClient(url, "GET",
      null, {}, beforeSend
    );
  },


  getAllPhotoIdTypes(accessToken) {
    let beforeSend = function (xhr) {
      xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
      xhr.setRequestHeader('authorization', 'Bearer ' + accessToken);
    };



    let appCode = this.appConfiguration.getApplicationCode();
    let orgCode = this.appConfiguration.getOrganizationCode();


    let url = this.gatewayServiceHost + "/"+orgCode+"/"+appCode+"/api/photoIdTypes";
    return this.appRestTemplate.httpRestClient(url, "GET",
      null, {}, beforeSend
    );
  },
  getAllStatesOrDistrictByCountryId(accessToken, countryId) {
    let beforeSend = function (xhr) {
      xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
      xhr.setRequestHeader('authorization', 'Bearer ' + accessToken);
    };

    let appCode = this.appConfiguration.getApplicationCode();
    let orgCode = this.appConfiguration.getOrganizationCode();


    let url = this.gatewayServiceHost + "/"+orgCode+"/"+appCode+"/api/countries/"+ countryId + "/states";


    //let url = baseUrl + "/countries/" + countryId + "/states";
    return this.appRestTemplate.httpRestClient(url, "GET",
      null, {}, beforeSend
    );
  },
  getAllCityOrTownByCountryIdAndStateId(accessToken, countryId, stateId) {
    let beforeSend = function (xhr) {
      xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
      xhr.setRequestHeader('authorization', 'Bearer ' + accessToken);
    };

    let appCode = this.appConfiguration.getApplicationCode();
    let orgCode = this.appConfiguration.getOrganizationCode();


    let url = this.gatewayServiceHost + "/"+orgCode+"/"+appCode+"/api/countries/"+ countryId + "/states/"+ stateId + "/towns";
    //let url = baseUrl + "/countries/" + countryId + "/states/" + stateId + "/towns";
    return this.appRestTemplate.httpRestClient(url, "GET",
      null, {}, beforeSend
    );
  },
  addCountryWiseState(accessToken, countryPayload) {

    let data = JSON.stringify(countryPayload);

    let beforeSend = function (xhr) {
      xhr.setRequestHeader('content-type', 'application/json');
      xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
    };

    let appCode = this.appConfiguration.getApplicationCode();
    let orgCode = this.appConfiguration.getOrganizationCode();


    let url = this.gatewayServiceHost + "/"+orgCode+"/"+appCode+"/api/countries";
    //let url = baseUrl + "/countries";
    return this.appRestTemplate.httpRestClient(url, "POST",
      data, {}, beforeSend
    );
  },
  addNewCountry(accessToken, countryPayload) {

    let data = JSON.stringify(countryPayload);

    let beforeSend = function (xhr) {
      xhr.setRequestHeader('content-type', 'application/json');
      xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
    };

    let appCode = this.appConfiguration.getApplicationCode();
    let orgCode = this.appConfiguration.getOrganizationCode();


    let url = this.gatewayServiceHost + "/"+orgCode+"/"+appCode+"/api/countries/";
    //let url = baseUrl + "/countries";
    return this.appRestTemplate.httpRestClient(url, "POST",
      data, {}, beforeSend
    );
  },
  addNewDistrict(accessToken, requestPayload) {

    let data = JSON.stringify(requestPayload);

    let beforeSend = function (xhr) {
      xhr.setRequestHeader('content-type', 'application/json');
      xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
    };

    let baseUrl = this.serviceInitializer.getServiceBaseHostURL();
    let url = baseUrl + "/countries";
    return this.appRestTemplate.httpRestClient(url, "POST",
      data, {}, beforeSend
    );
  },
  getAllRemittanceType(accessToken) {
    let beforeSend = function (xhr) {
      xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
      xhr.setRequestHeader('authorization', 'Bearer ' + accessToken);
    };

    let appCode = this.appConfiguration.getApplicationCode();
    let orgCode = this.appConfiguration.getOrganizationCode();


    let url = this.gatewayServiceHost + "/"+orgCode+"/"+appCode+"/api/remittanceTypes";
    //let url = baseUrl + "/remittanceTypes";
    return this.appRestTemplate.httpRestClient(url, "GET",
      null, {}, beforeSend
    );
  },
  getRemittancePurpose(accessToken) {
    let beforeSend = function (xhr) {
      xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
      xhr.setRequestHeader('authorization', 'Bearer ' + accessToken);
    };

    let appCode = this.appConfiguration.getApplicationCode();
    let orgCode = this.appConfiguration.getOrganizationCode();


    let url = this.gatewayServiceHost + "/"+orgCode+"/"+appCode+"/api/remittancePurposes";
    //let url = baseUrl + "/remittancePurposes";
    return this.appRestTemplate.httpRestClient(url, "GET",
      null, {}, beforeSend
    );
  },
  getAllFundSource(accessToken) {
    let beforeSend = function (xhr) {
      xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
      xhr.setRequestHeader('authorization', 'Bearer ' + accessToken);
    };

    let appCode = this.appConfiguration.getApplicationCode();
    let orgCode = this.appConfiguration.getOrganizationCode();


    let url = this.gatewayServiceHost + "/"+orgCode+"/"+appCode+"/api/fundSources";
    //let url = baseUrl + "/fundSources";
    return this.appRestTemplate.httpRestClient(url, "GET",
      null, {}, beforeSend
    );
  },
  getDeliveryAgent(accessToken) {
    let beforeSend = function (xhr) {
      xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
      xhr.setRequestHeader('authorization', 'Bearer ' + accessToken);
    };

    let appCode = this.appConfiguration.getApplicationCode();
    let orgCode = this.appConfiguration.getOrganizationCode();


    let url = this.gatewayServiceHost + "/"+orgCode+"/"+appCode+"/api/deliveryAgents";

    //let url = baseUrl + "/deliveryAgents";
    return this.appRestTemplate.httpRestClient(url, "GET",
      null, {}, beforeSend
    );
  },
  getAllBank(accessToken) {
    let beforeSend = function (xhr) {
      xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
      xhr.setRequestHeader('authorization', 'Bearer ' + accessToken);
    };

    let appCode = this.appConfiguration.getApplicationCode();
    let orgCode = this.appConfiguration.getOrganizationCode();


    let url = this.gatewayServiceHost + "/"+orgCode+"/"+appCode+"/api/banks";
    //let url = baseUrl + "/banks";
    return this.appRestTemplate.httpRestClient(url, "GET",
      null, {}, beforeSend
    );
  },
  getBranchByBankId(accessToken, bankId) {
    let beforeSend = function (xhr) {
      xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
      xhr.setRequestHeader('authorization', 'Bearer ' + accessToken);
    };

    let appCode = this.appConfiguration.getApplicationCode();
    let orgCode = this.appConfiguration.getOrganizationCode();


    let url = this.gatewayServiceHost + "/"+orgCode+"/"+appCode+"/api/banks/"+ bankId + "/branches";
    //let url = baseUrl + "/banks/" + bankId + "/branches";
    return this.appRestTemplate.httpRestClient(url, "GET",
      null, {}, beforeSend
    );
  },
  getAllCurrency(accessToken) {
    let beforeSend = function (xhr) {
      xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
      xhr.setRequestHeader('authorization', 'Bearer ' + accessToken);
    };

    //let baseUrl = this.serviceInitializer.getServiceBaseHostURL();
    let baseUrl = "http://rms.common-apps.115.127.24.184.nip.io";//may be custom url
    let url = baseUrl + "/currencies";
    return this.appRestTemplate.httpRestClient(url, "GET",
      null, {}, beforeSend
    );
  },
  addNewCurrency(serviceBaseHostUrl, accessToken, currencyPayload) {

    let data = JSON.stringify(currencyPayload);

    let beforeSend = function (xhr) {
      xhr.setRequestHeader('content-type', 'application/json');
      xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
    };


    let appCode = this.appConfiguration.getApplicationCode();
    let orgCode = this.appConfiguration.getOrganizationCode();


    let url = this.gatewayServiceHost + "/"+orgCode+"/"+appCode+"/api/currencies";

    //let url = serviceBaseHostUrl + "/currencies";
    return this.appRestTemplate.httpRestClient(url, "POST",
      data, {}, beforeSend
    );
  },
  getPaymentMode(accessToken) {
    let beforeSend = function (xhr) {
      xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
      xhr.setRequestHeader('authorization', 'Bearer ' + accessToken);
    };

    let appCode = this.appConfiguration.getApplicationCode();
    let orgCode = this.appConfiguration.getOrganizationCode();


    let url = this.gatewayServiceHost + "/"+orgCode+"/"+appCode+"/api/paymentModes";
    //let url = baseUrl + "/paymentModes";
    return this.appRestTemplate.httpRestClient(url, "GET",
      null, {}, beforeSend
    );
  },
});


