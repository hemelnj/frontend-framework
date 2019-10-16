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
  rmsBaseService: service('nges-services/rms/rms-base-service'),
  serviceInitializer: service('nges-services/service-initializer'),
  notifier: service(),

  init() {
    this._super(...arguments);

    // access service information
    let serviceInformation = this.get('serviceInformation');


    this.set('model', this.store.createRecord('nges-services/rms/currency'));

    this.getStatus();
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

  getStatus() {
    let context = this;
    let accessToken = this.appConfiguration.getAccessToken();
    let roleId = this.appConfiguration.getUserRoleId();
    let classTypeId = 6;//currency classtype id

    let actionEventName = "create";
    this.serviceInitializer.getUserAbilityToCreate(accessToken, actionEventName, classTypeId, roleId).then(function (result) {
      console.log('message-result', result);
      let status = {
        classTypeId: classTypeId,
        stateId: 77, //START state code for classtypeId 6
        roleId: roleId,
        actionEventId: result.data.id
      };
      context.rmsBaseService.getNextAllowableStateId(accessToken,status).then(function (result) {
        console.log('message--statusId', result.data.id);
        context.set('statusId',result.data.id);
      });
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

            let payload = {
              data: {
                "id": model.currencyId,
                "type": "currencies",
                "attributes": {
                  "id": model.currencyId,
                  "name": model.currencyName,
                  "code":model.currencyCode,
                  "status":this.get('statusId'),
                  "function":this.get('functionId'),
                  "location":this.get('locationId'),
                }
              }
            };

            console.log('message--payload', payload);
            let accessToken = this.appConfiguration.getAccessToken();
            let afterCurrencyRegistration = this.rmsSetupService.addNewCurrency(accessToken, payload);
            let context = this;
            afterCurrencyRegistration.then(function (msg) {
              context.get('notifier').danger('Failed to Save');
            }).catch(function (msg) {
              context.get('notifier').success('Currency Registration Successful');
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
