import Component from '@ember/component';
import {inject as service} from '@ember/service';


export default Component.extend({

  appWelcome: service('nges-core/app-welcome'),
  store: service(),
  showAlert: false,
  isRegistered: false,
  didValidate: false,
  appConfiguration: service('app-configuration'),
  rmsSetupService: service('nges-services/rms/rms-setup'),

  init() {
    this._super(...arguments);

    this.initialSetup();
    let serviceInformation = this.get('serviceInformation');
    this.set('model', this.store.createRecord('country-wise-state-reg'));
  },

  initialSetup() {
    this.set('countryRegFormData', {
      'states': []
    });
  },

  actions: {
    clear() {
      console.log('message-clear', 'clear');
    },


    addState() {

      let model = this.get('model');
      let state = null;

      this.set('countryRegFormData.name', model.countryName);
      this.set('countryRegFormData.nationality', model.nationality);


      if (model.stateCode) {
         state = {
          name: model.stateName,
          code: model.stateCode,
          towns: [],
        };
      }

      this.get('countryRegFormData.states').pushObject({
        name: model.stateName,
        code: model.stateCode,
        towns: [],
      });

      this.set('countryName',model.countryName);

    },



    saveCountry() {
      let model = this.get('model');
      let context = this;

      let countryFromData = this.get('countryRegFormData');

      console.log('message', countryFromData);

      //context.createPayload(countryFromData);
    },

    clearCountry() {
      this.set('countryFromData', {});
      this.set('model', {})
    },
  },

  createPayload(countryFromData) {
    let countryPayload = {
      "data": {
        "id": 1,
        "type": "countries",
        "attributes": {
          "id": 1,
          "name": countryFromData.countryName,
          "code": "101",
          "nationality": countryFromData.nationality,
          "status": "101",
          "functionId": 1,
          "location": 1,
          "states": countryFromData.states
        }
      }
    };

    let accessToken = this.appConfiguration.getAccessToken();
    let afterCountryAdd = this.rmsSetupService.addCountryWiseState(accessToken, countryPayload);
    afterCountryAdd.then(function (msg) {
    }).catch(function (msg) {
      console.log('message-afterCountryAdd', msg);
    });
  }

})
