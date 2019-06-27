import Service, {inject as service} from '@ember/service';
import config from 'frontend-engine/config/environment';


export default Service.extend({
  store: service(),
  appRestTemplate: service('app-rest-template'),


  //generate service Host Url base on params
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
  getAllCountries(accessToken) {




    let beforeSend = function (xhr) {
      xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
      xhr.setRequestHeader('authorization', 'Bearer ' + accessToken);
    };

    let baseUrl = this.getServiceBaseHostURL();
    let url = baseUrl + "/countries";
    return this.appRestTemplate.httpRestClient(url, "GET",
      null, {}, beforeSend
    );
  },
  getAllStatesOrDistrictByCountryId(accessToken, countryId) {
    let beforeSend = function (xhr) {
      xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
      xhr.setRequestHeader('authorization', 'Bearer ' + accessToken);
    };

    let baseUrl = this.getServiceBaseHostURL();
    let url = baseUrl + "/countries/" + countryId + "/states";
    return this.appRestTemplate.httpRestClient(url, "GET",
      null, {}, beforeSend
    );
  },
  getAllCityOrTownByCountryIdAndStateId(accessToken, countryId, stateId) {
    let beforeSend = function (xhr) {
      xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
      xhr.setRequestHeader('authorization', 'Bearer ' + accessToken);
    };

    let baseUrl = this.getServiceBaseHostURL();
    let url = baseUrl + "/countries/" + countryId + "/states/" + stateId + "/towns";
    return this.appRestTemplate.httpRestClient(url, "GET",
      null, {}, beforeSend
    );
  },
  getAllPhotoIdTypes(accessToken) {
    let beforeSend = function (xhr) {
      xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
      xhr.setRequestHeader('authorization', 'Bearer ' + accessToken);
    };

    let baseUrl = this.getServiceBaseHostURL();
    let url = baseUrl + "/photoIdTypes";
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

    let baseUrl = this.getServiceBaseHostURL();
    let url = baseUrl + "/countries";
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

    let baseUrl = this.getServiceBaseHostURL();
    let url = baseUrl + "/countries";
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

    let baseUrl = this.getServiceBaseHostURL();
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

    let baseUrl = this.getServiceBaseHostURL();
    let url = baseUrl + "/remittanceTypes";
    return this.appRestTemplate.httpRestClient(url, "GET",
      null, {}, beforeSend
    );
  },
  getRemittancePurpose(accessToken) {
    let beforeSend = function (xhr) {
      xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
      xhr.setRequestHeader('authorization', 'Bearer ' + accessToken);
    };

    let baseUrl = this.getServiceBaseHostURL();
    let url = baseUrl + "/remittancePurposes";
    return this.appRestTemplate.httpRestClient(url, "GET",
      null, {}, beforeSend
    );
  },
  getAllFundSource(accessToken) {
    let beforeSend = function (xhr) {
      xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
      xhr.setRequestHeader('authorization', 'Bearer ' + accessToken);
    };

    let baseUrl = this.getServiceBaseHostURL();
    let url = baseUrl + "/fundSources";
    return this.appRestTemplate.httpRestClient(url, "GET",
      null, {}, beforeSend
    );
  },
  getDeliveryAgent(accessToken) {
    let beforeSend = function (xhr) {
      xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
      xhr.setRequestHeader('authorization', 'Bearer ' + accessToken);
    };

    let baseUrl = this.getServiceBaseHostURL();
    let url = baseUrl + "/deliveryAgents";
    return this.appRestTemplate.httpRestClient(url, "GET",
      null, {}, beforeSend
    );
  },
  getAllBank(accessToken) {
    let beforeSend = function (xhr) {
      xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
      xhr.setRequestHeader('authorization', 'Bearer ' + accessToken);
    };

    let baseUrl = this.getServiceBaseHostURL();
    let url = baseUrl + "/banks";
    return this.appRestTemplate.httpRestClient(url, "GET",
      null, {}, beforeSend
    );
  },
  getBranchByBankId(accessToken, bankId) {
    let beforeSend = function (xhr) {
      xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
      xhr.setRequestHeader('authorization', 'Bearer ' + accessToken);
    };

    let baseUrl = this.getServiceBaseHostURL();
    let url = baseUrl + "/banks/" + bankId + "/branches";
    return this.appRestTemplate.httpRestClient(url, "GET",
      null, {}, beforeSend
    );
  },
  getAllCurrency(accessToken) {
    let beforeSend = function (xhr) {
      xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
      xhr.setRequestHeader('authorization', 'Bearer ' + accessToken);
    };

    let baseUrl = this.getServiceBaseHostURL();
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

    let url = serviceBaseHostUrl + "/currencies";
    return this.appRestTemplate.httpRestClient(url, "POST",
      data, {}, beforeSend
    );
  },
  getPaymentMode(accessToken) {
    let beforeSend = function (xhr) {
      xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
      xhr.setRequestHeader('authorization', 'Bearer ' + accessToken);
    };

    let baseUrl = this.getServiceBaseHostURL();
    let url = baseUrl + "/paymentModes";
    return this.appRestTemplate.httpRestClient(url, "GET",
      null, {}, beforeSend
    );
  },
});


// mukit working
