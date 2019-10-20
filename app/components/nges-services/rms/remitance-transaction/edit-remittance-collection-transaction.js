import Component from '@ember/component';
import Service, {inject as service} from '@ember/service';


export default Component.extend({


  appConfiguration: service('app-configuration'),
  transactionActionService: service('nges-services/rms/transaction-action'),
  init() {
    this._super(...arguments);


    let routeParams = this.appConfiguration.getRouteURLParams();

    this.set('actionAccess',routeParams.editAccess);

    let collectionId = routeParams.stateRecordId;
    console.log('message---collectionId', collectionId);

    this.loadCollectionDataById(collectionId);
  },

  loadCollectionDataById(collectionId) {
    let context = this;
    let accessToken = this.appConfiguration.getAccessToken();
    let allCountryData = this.transactionActionService.getCollectionDataById(collectionId,accessToken);

    allCountryData.then(function (msg) {
      console.log('message--allCountryData', msg);
      context.set('collectionData',{
        type:'edit',
        data:msg.data.attributes,
      });
    });
  },


})
