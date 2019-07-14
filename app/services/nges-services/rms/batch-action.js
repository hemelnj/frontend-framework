import Service, {inject as service} from '@ember/service';


export default Service.extend({
  store: service(),
  appRestTemplate: service('app-rest-template'),
  serviceInitializer: service('nges-services/service-initializer'),




  addNewBatch(accessToken, payload) {
    let data = JSON.stringify(payload);

    let beforeSend = function (xhr) {
      xhr.setRequestHeader('content-type', 'application/json');
      xhr.setRequestHeader('authorization', 'Bearer ' + accessToken);
    };

    let baseUrl = this.serviceInitializer.getServiceBaseHostURL();
    let url = baseUrl + "/save";
    return this.appRestTemplate.httpRestClient(url, "POST",
      data, {}, beforeSend
    );
  },



});



