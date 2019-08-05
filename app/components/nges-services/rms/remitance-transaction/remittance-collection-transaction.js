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
  transactionActionService: service('nges-services/rms/transaction-action'),
  rmsBaseService: service('nges-services/rms/rms-base-service'),
  notifier: service(),
  serviceInitializer: service('nges-services/service-initializer'),

  init() {
    this._super(...arguments);
    let serviceInformation = this.get('serviceInformation');

    this.set('model', this.store.createRecord('nges-services/rms/remittance-collection-trans'));

    this.initRiskStatus();
    this.setRisk();
    this.getUserType();
    this.loadAllCountries();
    this.loadRemittanceType();
    this.loadRemittancePurpose();
    this.loadFundSources();
    this.loadDeliveryAgents();
    this.loadAllBanks();
    this.loadAllCurrency();
    this.loadPaymentMode();

    let startStateId = this.appWelcome.getStartStateId();
    this.getNextAllowableState(startStateId);

    this.getDefaultUserLocationId();
    this.getDefaultUserFunctionId();
  },

  didUpdateAttrs() {
    this._super(...arguments);
    let beneficiaryData = this.get('beneficiaryData');
    let type = beneficiaryData.type;
    if (type === "edit") {
      this.setModel(beneficiaryData.data);
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
    let functionId = this.rmsBaseService.getDefaultFunctionId(accessToken,userId);

    functionId.then(function (msg) {
      console.log('message--functionId', msg.data.attributes.id);
      context.set('functionId', msg.data.attributes.id);
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


  loadAllCountries() {
    let context = this;
    let accessToken = this.appConfiguration.getAccessToken();
    let allCountryData = this.rmsSetupService.getAllCountries(accessToken);

    allCountryData.then(function (msg) {
      context.set('countryList', msg.data);
    }).catch(function (errorMsg) {
      context.get('notifier').danger('Failed to Load Country List');
    });
  },

  loadRemittanceType() {
    let context = this;
    let accessToken = this.appConfiguration.getAccessToken();
    let allRemittanceType = this.rmsSetupService.getAllRemittanceType(accessToken);

    allRemittanceType.then(function (msg) {
      context.set('remittanceTypeList', msg.data);
    }).catch(function (errorMsg) {
      context.get('notifier').danger('Failed to Load Remittance Types');
    });
  },

  loadRemittancePurpose() {
    let context = this;
    let accessToken = this.appConfiguration.getAccessToken();
    let allRemittancePurpose = this.rmsSetupService.getRemittancePurpose(accessToken);

    allRemittancePurpose.then(function (msg) {
      context.set('remittancePurposeList', msg.data);
    }).catch(function (errorMsg) {
      context.get('notifier').danger('Failed to Load Remittance Purposes');
    });
  },

  loadFundSources() {
    let context = this;
    let accessToken = this.appConfiguration.getAccessToken();
    let allFundSource = this.rmsSetupService.getAllFundSource(accessToken);

    allFundSource.then(function (msg) {
      context.set('fundSourceList', msg.data);
    }).catch(function (errorMsg) {
      context.get('notifier').danger('Failed to Load Fund Sources');
    });
  },

  loadDeliveryAgents() {
    let context = this;
    let accessToken = this.appConfiguration.getAccessToken();
    let allDeliveryAgent = this.rmsSetupService.getDeliveryAgent(accessToken);

    allDeliveryAgent.then(function (msg) {
      context.set('deliveryAgentList', msg.data);
    }).catch(function (errorMsg) {
      context.get('notifier').danger('Failed to Load Delivery Agents');
    });
  },

  loadAllBanks() {
    let context = this;
    let accessToken = this.appConfiguration.getAccessToken();
    let allBank = this.rmsSetupService.getAllBank(accessToken);

    allBank.then(function (msg) {
      context.set('bankList', msg.data);
    }).catch(function (errorMsg) {
      context.get('notifier').danger('Failed to Load Bank Lists');
    });
  },

  loadAllCurrency() {
    let context = this;
    let accessToken = this.appConfiguration.getAccessToken();
    let allBank = this.rmsSetupService.getAllCurrency(accessToken);

    allBank.then(function (msg) {
      context.set('currencyList', msg.data);
    }).catch(function (errorMsg) {
      context.get('notifier').danger('Failed to Load All Currencies');
    });
  },

  loadPaymentMode() {
    let context = this;
    let accessToken = this.appConfiguration.getAccessToken();
    let allBank = this.rmsSetupService.getPaymentMode(accessToken);

    allBank.then(function (msg) {
      context.set('paymentModeList', msg.data);
    }).catch(function (errorMsg) {
      context.get('notifier').danger('Failed to Load All Payment Mode');
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
      let classTypeId = result.data;//remitter classtype id
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

    onChangeRemitanceType(value) {
      let context = this;
      let remittanceTypeId = value.id;
      context.defaultInitializer('remTypeId',remittanceTypeId);
    },
    onChangeRemittancePurpose(value) {
      let context = this;
      let remittancePurposeId = value.id;
      context.defaultInitializer('remPurposeId',remittancePurposeId);
    },
    onChangeSourceOfFund(value) {
      let context = this;
      let fundSourceId = value.id;
      context.defaultInitializer('fundSourceId',fundSourceId);
    },
    onChangeDeliveryAgent(value) {
      let context = this;
      let deliveryAgentId = value.id;
      context.defaultInitializer('deliveryAgentId',deliveryAgentId);
    },
    onChangeBeneficiaryCountry(value) {
      let context = this;
      let beneficiaryCountryId = value.id;
      context.defaultInitializer('beneficiaryCountryId',beneficiaryCountryId);
    },
    onChangeBeneficiaryBank(value) {
      let context = this;
      let beneficiaryBankId = value.id;
      context.defaultInitializer('beneficiaryBankId',beneficiaryBankId);
      let accessToken = this.appConfiguration.getAccessToken();
      let bankBranches = this.rmsSetupService.getBranchByBankId(accessToken, beneficiaryBankId);

      bankBranches.then(function (msg) {
        context.set('bankBranchList', msg.data);
      }).catch(function (errorMsg) {
        context.get('notifier').danger('Failed To Load Bank Branches');
      });
    },
    onChangeBeneficiaryBranch(value) {
      let context = this;
      let beneficiaryBranchId = value.id;
      context.defaultInitializer('beneficiaryBranchId',beneficiaryBranchId);
    },
    onChangeCurrency(value) {
      let context = this;
      let currencyId = value.id;
      context.defaultInitializer('currencyId',currencyId);
    },

    onChangePaymentMode(value) {
      let context = this;
      let payAmountModeId = value.id;
      context.defaultInitializer('payAmountModeId',payAmountModeId);
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

            let remCollectionData = {
              "data": {
                "id": 1,
                "type": "remittanceTransactions",
                "attributes": {
                  "id": 1,
                  "remitter": {
                    "id": model.remId
                  },
                  "remittanceType": {
                    "id": 1
                  },
                  "remittancePurpose": {
                    "id": model.remPurposeId
                  },
                  "fundSource": {
                    "id": model.fundSourceId
                  },
                  "deliveryAgent": {
                    "id": model.deliveryAgentId
                  },
                  "beneficiarysCountry": {
                    "id": model.beneficiaryCountryId
                  },
                  "beneficiary": {
                    "id": model.beneficiaryId
                  },
                  "beneficiarysBank": {
                    "id": model.beneficiaryBankId
                  },
                  "beneficiarysBranch": {
                    "id": model.beneficiaryBranchId
                  },
                  "inputAmount": Number(model.inputAmount),
                  "currency": {
                    "id": model.currencyId
                  },
                  "transferAmount": Number(model.transferAmount),
                  "localAmount": Number(model.localAmount),
                  "commissionAmount": Number(model.comissionAmount),
                  "totalValueNeedToPay": Number(model.totalPayValue),
                  "totalValueNeedToAdjust": Number(model.totalAdjustValue),
                  "totalPayAmount": Number(model.totalPayAmount),
                  "paymentMode": {
                    "id": model.payAmountModeId
                  },
                  "olcmState":{
                    "id":this.get('statusId'),
                  },
                  "function": this.get('functionId'),
                  "location": this.get('locationId'),
                  "createdBy": "msi",
                  "createdAt": 1,
                  "updatedBy": "msi",
                  "updatedAt": 1
                }
              }
            };

            console.log('message--remCollectionData', JSON.stringify(remCollectionData));

            let accessToken = this.appConfiguration.getAccessToken();
            let afterRemitterRegistration = this.transactionActionService.addNewRemittanceCollection(accessToken, remCollectionData);
            let context = this;
            afterRemitterRegistration.then(function (msg) {
            }).catch(function (msg) {
              if(msg.status===201){
                context.get('notifier').success('Remittance Collection Successful!');
              }else{
                context.get('notifier').danger('Remittance Collection Failed!\nError while committing the transaction.');
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
