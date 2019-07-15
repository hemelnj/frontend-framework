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
  beneficiaryActionService: service('nges-services/rms/beneficiary-action'),
  rmsBaseService: service('nges-services/rms/rms-base-service'),
  peSetupService: service('nges-engines/property-extender/pe-setup'),

  notifier: service(),
  serviceInitializer: service('nges-services/service-initializer'),
  init() {
    this._super(...arguments);
    let serviceInformation = this.get('serviceInformation');

    this.set('selectedNationality', {});
    this.set('selectedCountry', {});
    this.set('selectedState', {});
    this.set('selectedRisk', {});

    this.set('model', this.store.createRecord('nges-services/rms/beneficiary-reg-form'));


    this.getUserType();
    this.loadAllCountries();
    this.loadPhotoId();

    let startStateId = this.appWelcome.getStartStateId();
    this.getNextAllowableState(startStateId);

    this.getDefaultUserFunctionId();
    this.getDefaultUserLocationId();
    this.initRiskStatus();
    this.setRisk();
  },

  didUpdateAttrs() {
    this._super(...arguments);
    let beneficiaryData = this.get('beneficiaryData');
    let type = beneficiaryData.type;
    if (type === "edit") {
      this.setModel(beneficiaryData.data);
    }
  },

  setModel(beneficiaryData) {
    console.log(beneficiaryData);
    this.set('model.beneficiaryId', beneficiaryData.id);
    this.set('model.beneficiaryName', beneficiaryData.name);
    this.set('model.address1', beneficiaryData.addressOne);
    this.set('model.address2', beneficiaryData.addressTwo);

    this.set('selectedCountry.label', beneficiaryData.country.name);//show in ui
    this.set('model.countryId', beneficiaryData.country.id);
    this.set('model.country', beneficiaryData.country.name);

    this.set('selectedState.label', beneficiaryData.state.name);//show in ui
    this.set('model.state', beneficiaryData.state.name);
    this.set('model.stateId', beneficiaryData.state.id);

    this.set('selectedRisk.label', beneficiaryData.risk);//show in ui
    this.set('model.risk', beneficiaryData.risk);

    this.set('model.mNumber', beneficiaryData.contactNo);
    this.set('model.email', beneficiaryData.emailId);

    this.set('model.cityOrTown', beneficiaryData.town);
    this.set('model.zipCode', beneficiaryData.zipCode);

    this.set('model.relationWithRemitter', beneficiaryData.relationshipWithRemitter);
    this.set('statusId', beneficiaryData.status);
  },
  setRisk() {
    let data = [
      {
        id: 1,
        type: "type",
        attributes: {
          name: "LOW"
        }
      },
      {
        id: 1,
        type: "type",
        attributes: {
          name: "MEDIUM"
        }
      },
      {
        id: 1,
        type: "type",
        attributes: {
          name: "HIGH"
        }
      },
    ];

    this.set("riskType", data);
  },

  getUserType() {
    let context = this;
    let roleId = this.appConfiguration.getUserRoleId();
    if (roleId === 5) {
      context.set("showMLROReview", true);
    } else {
      context.set("showMLROReview", false);
    }
  },

  getDefaultUserFunctionId() {
    let context = this;
    let accessToken = this.appConfiguration.getAccessToken();
    let userId = this.appConfiguration.getUserId();
    let functionId = this.rmsBaseService.getDefaultFunctionId(accessToken, userId);

    functionId.then(function (msg) {
      console.log('message--functionId', msg.data.attributes.id);
      context.set('functionId', msg.data.attributes.id);
    }).catch(function (errorMsg) {
      context.get('notifier').danger('Failed to Load User Default Function Id');
    });
  },
  getDefaultUserLocationId() {
    let context = this;
    let accessToken = this.appConfiguration.getAccessToken();
    let userId = this.appConfiguration.getUserId();
    let locationId = this.rmsBaseService.getDefaultLocationId(accessToken, userId);

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

  defaultInitializer(propertyName, value) {
    this.set('model.' + propertyName, value);
  },

  loadPhotoId() {
    let context = this;
    let accessToken = this.appConfiguration.getAccessToken();
    let allCountryData = this.rmsSetupService.getAllPhotoIdTypes(accessToken);

    allCountryData.then(function (msg) {
      context.set('photoIdType', msg.data);
    }).catch(function (errorMsg) {
      context.get('notifier').danger('Failed to Load Photo Id List');
    });
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

        if (result){
          let status = {
            classTypeId: classTypeId,
            stateId: startStateId,
            roleId: roleId,
            actionEventId: result.data.id
          };
          context.rmsBaseService.getNextAllowableStateId(accessToken, status).then(function (result) {
            context.set('statusId', result.data.id);
          });
        }

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

    onChangeRisk(value) {
      let context = this;
      context.defaultInitializer('risk', value.attributes.name);
      console.log('onChangeRisk', value);
      context.set('selectedRisk', {
        label: (value === '') ? '' : value.attributes.name,
        value: value,
      });
    },


    onChangeNationality(value) {
      let context = this;
      context.defaultInitializer('nationality', value.attributes.name);
      context.defaultInitializer('nationalityId', value.id);
      context.set('selectedNationality', {
        label: (value === '') ? '' : value.attributes.name,
        value: value,
      });
    },

    onChangeCountry(value) {
      console.log('onChangeCountry-functions', value);

      let selectedCountryId = value.id;
      let context = this;
      context.defaultInitializer('country', value.attributes.name);
      context.defaultInitializer('countryId', selectedCountryId);
      context.defaultInitializer('code', value.attributes.code);
      context.defaultInitializer('status', value.attributes.status);

      context.set('selectedCountryId', selectedCountryId);
      context.set('selectedCountry', {
        label: (value === '') ? '' : value.attributes.name,
        value: value,
      });

      let accessToken = this.appConfiguration.getAccessToken();
      let allStateDataByCountry = this.rmsSetupService.getAllStatesOrDistrictByCountryId(accessToken, selectedCountryId);

      allStateDataByCountry.then(function (msg) {
        context.set('stateList', msg.data);
      });
    },

    onChangeStateOrDistrict(value) {

      let context = this;
      let selectedStateOrDistrictId = value.id;
      let selectedCountryId = context.get('selectedCountryId');

      context.defaultInitializer('state', value.attributes.name);
      context.defaultInitializer('stateId', selectedStateOrDistrictId);

      context.set('selectedCountryId', selectedCountryId);
      context.set('selectedState', {
        label: (value === '') ? '' : value.attributes.name,
        value: value,
      });

      /*let accessToken = this.appConfiguration.getAccessToken();
      let allCityOrTownData = this.rmsSetupService.getAllCityOrTownByCountryIdAndStateId(accessToken, selectedCountryId, selectedStateOrDistrictId);

      allCityOrTownData.then(function (msg) {
        context.set('townList', msg.data);
      });*/
    },

    onChangeCityOrTown(value) {
      let zipCode = JSON.parse(value).attributes.code;
      let context = this;

      context.defaultInitializer('town', JSON.parse(value).attributes.name);
      context.defaultInitializer('townId', JSON.parse(value).id);

      context.set('model.zipCode', zipCode);
      context.defaultInitializer('zipCode', zipCode);
    },

    onChangeJobNature(value) {
      let context = this;
      context.defaultInitializer('noj', value);
    },

    onChangePrimaryPhotoType(value) {
      let context = this;
      context.defaultInitializer('primaryPhotoType', JSON.parse(value).attributes.name);
      context.defaultInitializer('primaryPhotoId', JSON.parse(value).id);
    },

    onChangeSecondaryPhotoType(value) {
      let context = this;
      context.defaultInitializer('secondaryPhotoType', JSON.parse(value).attributes.name);
      context.defaultInitializer('secondaryPhotoId', JSON.parse(value).id);
    },

    getNextAllowableStateIdForCurrentState(actionEventId) {
      let context = this;
      let accessToken = this.appConfiguration.getAccessToken();
      let roleId = this.appConfiguration.getUserRoleId();

      let currentStateId = this.get('currentStateId');

      console.log('message--currentStateId', currentStateId);

      this.serviceInitializer.getClassType(accessToken).then(function (result) {
        let classTypeId = result.data;//remitter classtype id
        console.log('classTypeId--classTypeId', classTypeId);

        console.log('actionEventId', actionEventId);
        let status = {
          classTypeId: classTypeId,
          stateId: currentStateId,
          roleId: roleId,
          actionEventId: actionEventId
        };
        console.log('message-----', status);
        context.rmsBaseService.getNextAllowableStateId(accessToken, status).then(function (result) {

          console.log('nextStatusId', result.data.id);

          context.get('model')
            .validate()
            .then(({validations}) => {

              context.set('didValidate', true);


              let model = context.get('model');

              if (validations.get('isValid')) {
                context.setProperties({
                  showAlert: false,
                  isRegistered: true,
                });

                let beneficiaryData = {
                  data: {
                    "id": model.beneficiaryId,
                    "type": "beneficiaries",
                    "attributes": {
                      "id": model.beneficiaryId,
                      "relationshipWithRemitter": model.relationWithRemitter,
                      "code": model.code,
                      "contactNo": model.mNumber,
                      "emailId": model.email,
                      "addressOne": model.address1,
                      "addressTwo": model.address2,
                      "status": result.data.id,
                      "olcmState": {
                        "id": result.data.id
                      },
                      "function": context.get('functionId'),
                      "location": context.get('locationId'),
                      "risk": model.risk,
                      "country": {
                        "id": model.countryId
                      },
                      "state": {
                        "id": model.stateId
                      },
                      "town": model.cityOrTown,
                      "zipCode": model.zipCode,
                      "nationality": {
                        "id": model.nationalityId
                      },
                      "remarks": model.remarks,

                      "name": model.beneficiaryName
                    }
                  }
                };

                console.log('message--beneficiaryData', JSON.stringify(beneficiaryData));

                let accessToken = context.appConfiguration.getAccessToken();
                let afterBeneficiaryUpdate = context.serviceInitializer.stateActionUpdate(accessToken, model.beneficiaryId, beneficiaryData);

                afterBeneficiaryUpdate.then(function (msg) {
                }).catch(function (msg) {
                  if (msg.status === 204) {
                    context.get('notifier').success('Beneficiary Data Update Successful');
                  } else {
                    context.get('notifier').danger('Beneficiary Data Update Failed!');
                  }
                });

              } else {
                context.get('notifier').danger('Fill up all the fields properly');
              }
            });
        });

      });
    },

    updateAction() {
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

            let beneficiaryData = {
              data: {
                "id": model.beneficiaryId,
                "type": "beneficiaries",
                "attributes": {
                  "id": model.beneficiaryId,
                  "relationshipWithRemitter": model.relationWithRemitter,
                  "code": model.code,
                  "contactNo": model.mNumber,
                  "emailId": model.email,
                  "addressOne": model.address1,
                  "addressTwo": model.address2,
                  "status": this.get('statusId'),
                  "olcmState": {
                    "id": this.get('statusId'),
                  },
                  "function": this.get('functionId'),
                  "location": this.get('locationId'),
                  "risk": model.risk,
                  "country": {
                    "id": model.countryId
                  },
                  "state": {
                    "id": model.stateId
                  },
                  "town": model.cityOrTown,
                  "zipCode": model.zipCode,
                  "nationality": {
                    "id": model.nationalityId
                  },
                  "remarks": model.remarks,

                  "name": model.beneficiaryName
                }
              }
            };

            console.log('message--beneficiaryData', JSON.stringify(beneficiaryData));

            let accessToken = this.appConfiguration.getAccessToken();
            let afterBeneficiaryUpdate = this.beneficiaryActionService.updateBeneficiaryData(accessToken, beneficiaryData);
            let context = this;
            afterBeneficiaryUpdate.then(function (msg) {
            }).catch(function (msg) {
              if (msg.status === 204) {
                context.get('notifier').success('Beneficiary Data Update Successful');
              } else {
                context.get('notifier').danger('Beneficiary Data Update Failed!');
              }
            });

          } else {
            let context = this;
            context.get('notifier').danger('Fill up all the fields properly');
          }
        });
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

            let beneficiaryData = {
              data: {
                "id": model.beneficiaryId,
                "type": "beneficiaries",
                "attributes": {
                  "id": model.beneficiaryId,
                  "relationshipWithRemitter": model.relationWithRemitter,
                  "code": model.code,
                  "contactNo": model.mNumber,
                  "emailId": model.email,
                  "addressOne": model.address1,
                  "addressTwo": model.address2,
                  "olcmState": {
                    "id": this.get('statusId'),
                  },
                  "function": this.get('functionId'),
                  "location": this.get('locationId'),
                  "risk": model.risk,
                  "country": {
                    "id": model.countryId
                  },
                  "state": {
                    "id": model.stateId
                  },
                  "town": model.cityOrTown,
                  "zipCode": model.zipCode,
                  "nationality": {
                    "id": model.nationalityId
                  },
                  "remarks": model.remarks,

                  "name": model.beneficiaryName
                }
              }
            };

            console.log('message--beneficiaryData', JSON.stringify(beneficiaryData));

            let accessToken = this.appConfiguration.getAccessToken();
            let afterBeneficiaryRegistration = this.beneficiaryActionService.addNewBeneficiary(accessToken, beneficiaryData);
            let context = this;
            afterBeneficiaryRegistration.then(function (msg) {
            }).catch(function (msg) {
              if (msg.status === 201) {
                context.get('notifier').success('Beneficiary Registration Successful');
              } else {
                context.get('notifier').danger('Beneficiary Registration Failed!');
              }
            });

          } else {
            let context = this;
            context.get('notifier').danger('Fill up all the fields properly');
          }
        });
    },


    propertyExtend() {
      console.log('message--propertyExtend');
      let context = this;

      this.set('showPropertyExtender',true);
      let accessToken = this.appConfiguration.getAccessToken();

      this.serviceInitializer.getClassType(accessToken).then(function (result) {
        let classTypeId = result.data;//classtype id


        let allCreatedAttribute = context.peSetupService.getAllAttributesByClassTypeId(classTypeId,accessToken);

        allCreatedAttribute.then(function (attribute) {
          console.log('message--allCreatedAttribute', attribute);
          context.set('attributeList',attribute);
        }).catch(function (errorMsg) {
          context.get('notifier').danger('Failed To Load Attributes');
        });

      });



    },

    toggleProperty(p) {
      this.toggleProperty(p);
    },

    checkRiskStatus() {

      this.set('source', '5%');
      this.set('name', '15%');
      this.set('country', '5%');
      this.set('dob', '5%');
      this.set('fname', '10%');
      this.set('score', '40%');
      this.set('risk', 'medium');

      console.log('message-checkRiskStatus', 'checkRiskStatus');
    },

    checkDuplicate() {
      console.log('message-checkDuplicate', 'checkDuplicate');
    }
  }

})