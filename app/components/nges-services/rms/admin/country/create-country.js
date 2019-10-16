import Component from '@ember/component';
import Service, {inject as service} from '@ember/service';


export default Component.extend({

  appWelcome: service('nges-core/app-welcome'),
  store: service(),
  showAlert: false,
  isRegistered: false,
  didValidate: false,

  appConfiguration: service('app-configuration'),
  rmsSetupService: service('nges-services/rms/rms-setup'),
  rmsBaseService: service('nges-services/rms/rms-base-service'),
  notifier: service(),

  init() {
    this._super(...arguments);

    // access service information
    let serviceInformation = this.get('serviceInformation');



    this.set('model', this.store.createRecord('nges-services/rms/country-reg'));

    this.getDefaultUserLocationId();
    this.getDefaultUserFunctionId();
  },

  getDefaultUserFunctionId(){
    let context = this;
    let accessToken = this.appConfiguration.getAccessToken();
    let userId = this.appConfiguration.getUserId();
    let functionId = this.rmsBaseService.getDefaultFunctionId(accessToken,userId);

    functionId.then(function (msg) {
      console.log('message--functionId', msg.data.attributes.id);
      context.set('functionId', msg.data.attributes.id);
    }).catch(function (errorMsg) {
      context.get('notifier').danger('Failed to Load User Default Function Id');
    });
  },
  getDefaultUserLocationId(){
    let context = this;
    let accessToken = this.appConfiguration.getAccessToken();
    let userId = this.appConfiguration.getUserId();
    let locationId = this.rmsBaseService.getDefaultLocationId(accessToken,userId);

    locationId.then(function (msg) {
      console.log('message--locationId', msg.data.attributes.id);
      context.set('locationId', msg.data.attributes.id);
    }).catch(function (errorMsg) {
      context.get('notifier').danger('Failed to Load User Default Location Id');
    });
  },

  actions: {

    saveAction() {

      this.get('model')
        .validate()
        .then(({validations}) => {

          this.set('didValidate', true);

          let model = this.get('model');

          if (validations.get('isValid')) {
            this.setProperties({
              showAlert: false,
              isRegistered: true,
            });

            let currencyData = {
              data: {
                "id": model.id,
                "type": "currencies",
                "attributes": {
                  "id": model.id,
                  "name": model.currencyName,
                  "code":model.currencyCode,
                  "status":"101",
                  "function":this.get('functionId'),
                  "location":this.get('locationId'),
                }
              }
            };
            console.log('message--currencyData', JSON.stringify(currencyData));

            let accessToken = this.appConfiguration.getAccessToken();
            let afterCurrencyRegistration = this.rmsSetupService.addNewCountry(accessToken, currencyData);
            let context = this;
            afterCurrencyRegistration.then(function (msg) {
              context.get('notifier').success('Currency Registration Successful');
            }).catch(function (msg) {
              context.get('notifier').danger('Failed to Save');
              context.loadAllCurrency();
            });

          } else {
            this.set('showAlert', true);
          }
        });
    },

    editActionEvent() {
      let context = this;
      context.get('notifier').success('Working on Edit');
    },

    clear() {
      this.set('model', {});
    }
  }

})
