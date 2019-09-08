import Component from '@ember/component';
import Service, {inject as service} from '@ember/service';


export default Component.extend({

  appWelcome: service('nges-core/app-welcome'),
  store: service(),
  showAlert: false,
  isRegistered: false,
  didValidate: false,

  appConfiguration: service('app-configuration'),
  rmsSetupService: service('nges-services/rmscore/rmscore-setup'),
  transactionActionService: service('nges-services/rmscore/cover-fund-transaction-action'),
  rmsBaseService: service('nges-services/rmscore/rmscore-base-service'),
  notifier: service(),
  serviceInitializer: service('nges-services/service-initializer'),

  init() {
    this._super(...arguments);
    let serviceInformation = this.get('serviceInformation');

    this.set('model', this.store.createRecord('nges-services/rmscore/cover-fund-trans'));


    let startStateId = this.appWelcome.getStartStateId();

    this.getNextAllowableState(startStateId);

    this.getDefaultUserLocationId();
    this.getDefaultUserFunctionId();

    this.loadExchangeHouse();
  },

  didUpdateAttrs() {
    this._super(...arguments);
    let collectionData = this.get('collectionData');
    let type = collectionData.type;
    if (type === "edit") {
      //this.setModel(beneficiaryData.data);
      console.log('message--collectionData', collectionData.data);
    }
  },


  setRisk() {
    let data = [
      {
        id: 1,
        type: "risk",
        attributes: {
          name: "LOW"
        }
      },
      {
        id: 1,
        type: "risk",
        attributes: {
          name: "MEDIUM"
        }
      },
      {
        id: 1,
        type: "risk",
        attributes: {
          name: "HIGH"
        }
      },
    ];

    this.set("riskType", data);
  },

  getUserType(){
    let context = this;
    let roleId = this.appConfiguration.getUserRoleId();

    if(roleId===5){
      context.set("showMLROReview",true);
    }else{
      context.set("showMLROReview",false);
    }
  },

  getDefaultUserFunctionId(){
    let context = this;
    let accessToken = this.appConfiguration.getAccessToken();
    let userId = this.appConfiguration.getUserId();
    let orgId = this.appConfiguration.getOrganizationId();
    let functionId = this.rmsBaseService.getDefaultFunctionId(accessToken,userId,orgId);

    functionId.then(function (msg) {
      console.log('message--functionId', msg.data.attributes.id);
      context.set('functionId', msg.data.attributes.id);
    });
  },
  getDefaultUserLocationId(){
    let context = this;
    let accessToken = this.appConfiguration.getAccessToken();
    let userId = this.appConfiguration.getUserId();
    let orgId = this.appConfiguration.getOrganizationId();
    let locationId = this.rmsBaseService.getDefaultLocationId(accessToken,userId,orgId);

    locationId.then(function (msg) {
      console.log('message--locationId', msg.data.attributes.id);
      context.set('locationId', msg.data.attributes.id);
    }).catch(function (errorMsg) {
      context.get('notifier').danger('Failed to Load User Default Location Id');
    });
  },



  loadExchangeHouse() {
    let context = this;
    let accessToken = this.appConfiguration.getAccessToken();
    let allBank = this.rmsSetupService.getExchangeHouse(accessToken);

    allBank.then(function (msg) {
      context.set('exchangeHouseList', msg.data);
    }).catch(function (errorMsg) {
      context.get('notifier').danger('Failed to Load Exchange House Data');
    });
  },

  defaultInitializer(propertyName, value) {
    this.set('model.' + propertyName, value);
  },

  getNextAllowableState(startStateId) {
    let context = this;
    let accessToken = this.appConfiguration.getAccessToken();
    let roleId = this.appConfiguration.getUserRoleId();

    this.serviceInitializer.getClassType(accessToken).then(function (result) {
      let classTypeId = result.data;
      console.log('classTypeId--classTypeId', classTypeId);
      let actionEventName = "create";

      context.serviceInitializer.getUserAbilityToCreate(accessToken, actionEventName, classTypeId, roleId).then(function (result) {
        console.log('actionEventId', result.data.id);
        let status = {
          classTypeId: classTypeId,
          stateId: startStateId,
          roleId: roleId,
          actionEventId: result.data.id
        };
        console.log('message-startStateId', startStateId);
        console.log('message-----', status);
        context.rmsBaseService.getNextAllowableStateId(accessToken, status).then(function (result) {
          console.log('statusId', result.data.id);
          context.set('statusId', result.data.id);
        });
      });
    });
  },

  initRiskStatus() {
    this.set('source', '-');
    this.set('name', '-');
    this.set('country', '-');
    this.set('dob', '-');
    this.set('fname', '-');
    this.set('score', '-');
    this.set('risk', '');

    console.log('message-checkRiskStatus', 'checkRiskStatus');
  },

  actions: {
    reset() {
      this.set('model', {});
    },
    onChangeRisk(selectedValue) {
       console.log('message', selectedValue);
    },

    onChangeExchangeHouse(value) {
      let context = this;
      let exchangeHouseId = value.id;
      context.defaultInitializer('exchangeHouseId',exchangeHouseId);
    },


    validate() {
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

            let coverFundData = {
              "data": {
                "id": 1,
                "type": "coverFundTransactions",
                "attributes": {
                  "exchangeHouse": {
                    "id": model.exchangeHouseId
                  },
                  "amount": Number(model.inputAmount),

                  "olcmState":{
                    "id":this.get('statusId'),
                  },
                  "function": this.get('functionId'),
                  "location": this.get('locationId')
                }
              }
            };

            console.log('message--remCollectionData', JSON.stringify(coverFundData));

            let accessToken = this.appConfiguration.getAccessToken();
            let afterCoverFundRegistration = this.transactionActionService.addNewCoverFund(accessToken, coverFundData);
            let context = this;
            afterCoverFundRegistration.then(function (msg) {
            }).catch(function (msg) {
              if(msg.status===201){
                context.get('notifier').success('Cover Fund Collection Successful!');
              }else{
                context.get('notifier').danger('Cover Fund Collection Failed!\nError while committing the transaction.');
              }
            });

          } else {
            let context = this;
            context.get('notifier').danger('Fill up all the fields properly');
          }
        });
    },

    toggleProperty(p) {
      this.toggleProperty(p);
    },

    checkRiskStatus() {

      this.set('source','5%');
      this.set('name','10%');
      this.set('country','5%');
      this.set('dob','5%');
      this.set('fname','5%');
      this.set('score','30%');
      this.set('risk','low');

      console.log('message-checkRiskStatus', 'checkRiskStatus');
    }
  }

})
