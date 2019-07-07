import Service, {inject as service} from '@ember/service';
import config from 'frontend-engine/config/environment';


export default Service.extend({
  store: service(),
  appRestTemplate: service('app-rest-template'),
  serviceInitializer: service('nges-services/service-initializer'),

  addNewRemittanceCollection(accessToken, remCollectionData) {
    let data = JSON.stringify(remCollectionData);

    let beforeSend = function (xhr) {
      xhr.setRequestHeader('content-type', 'application/json');
      xhr.setRequestHeader('authorization', 'Bearer ' + accessToken);
    };

    let baseUrl = this.serviceInitializer.getServiceBaseHostURL();
    let url = baseUrl + "/remittanceTransactions";
    return this.appRestTemplate.httpRestClient(url, "POST",
      data, {}, beforeSend
    );
  },

});

