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
  remitterActionService: service('nges-services/rms/remitter-action'),
  rmsBaseService: service('nges-services/rms/rms-base-service'),
  notifier: service(),
  serviceInitializer: service('nges-services/service-initializer'),
  peSetupService: service('nges-engines/property-extender/pe-setup'),
  init() {
    this._super(...arguments);
    let serviceInformation = this.get('serviceInformation');

    //console.log('this.appConfiguration.getRouteParams()',this.appConfiguration.getRouteParams());

    this.set('selectedType', {});
    this.set('selectedNationality', {});
    this.set('selectedCountry', {});
    this.set('selectedState', {});
    this.set('selectedNOJ', {});
    this.set('selectedPrimaryPhotoType', {});
    this.set('selectedSecondaryPhotoType', {});
    this.set('selectedRisk', {});


    this.set('model', this.store.createRecord('nges-services/rms/remitter-reg-form'));

    this.initRiskStatus();
    this.setType();
    this.setJobNature();
    this.getUserType();
    this.loadAllCountries();
    this.loadPhotoId();
    this.setRisk();
    this.getDefaultUserFunctionId();
    this.getDefaultUserLocationId();


    let startStateId = this.appWelcome.getStartStateId();
    this.getNextAllowableStateForCreate(startStateId);
  },

  didUpdateAttrs() {
    this._super(...arguments);
    let remitterData = this.get('remitterData');
    let type = remitterData.type;
    if (type === "edit") {
      let tabInformation = this.appConfiguration.getRouteURLParams();


      let activeStateId = tabInformation.stateId;

      this.loadStateActions(activeStateId);
      this.set('currentStateId', activeStateId);

      this.setModel(remitterData.data);
    }
  },


  setModel(remitterData) {

    console.log('message-remitterData', remitterData);


    this.set('model.remId', remitterData.id);
    this.set('model.type', remitterData.type);
    this.set('selectedType.label', remitterData.type);//show in ui
    this.set('model.dob', convert(remitterData.dateOfBirth));

    this.set('selectedNationality.label', remitterData.nationality.name);//show in ui
    this.set('model.nationality', remitterData.nationality.name);
    this.set('model.nationalityId', remitterData.nationality.id);

    this.set('selectedCountry.label', remitterData.country.name);//show in ui
    this.set('model.countryId', remitterData.country.id);
    this.set('model.country', remitterData.country.name);


    this.set('selectedNOJ.label', remitterData.natureOfJob);//show in ui
    this.set('model.noj', remitterData.natureOfJob);

    this.set('selectedState.label', remitterData.state.name);//show in ui
    this.set('model.state', remitterData.state.name);
    this.set('model.stateId', remitterData.state.id);


    this.set('selectedPrimaryPhotoType.label', remitterData.primaryPhotoId.idType);//show in ui
    this.set('model.primaryPhotoType', remitterData.primaryPhotoId.type);
    this.set('model.primaryPhotoId', remitterData.primaryPhotoId.id);
    this.set('model.primaryPhotoIssue', convert(remitterData.primaryPhotoId.issueDate));
    this.set('model.primaryPhotoExpiry', convert(remitterData.primaryPhotoId.expiryDate));

    this.set('selectedSecondaryPhotoType.label', remitterData.secondaryPhotoId.idType);//show in ui
    this.set('model.secondaryPhotoType', remitterData.secondaryPhotoId.type);
    this.set('model.secondaryPhotoId', remitterData.secondaryPhotoId.id);
    this.set('model.secondaryPhotoIssue', convert(remitterData.secondaryPhotoId.issueDate));
    this.set('model.secondaryPhotoExpiry', convert(remitterData.secondaryPhotoId.expiryDate));

    this.set('selectedRisk.label', remitterData.risk);//show in ui
    this.set('model.risk', remitterData.risk);

    this.set('model.remitterName', remitterData.name);
    this.set('model.fathersName', remitterData.fathersName);
    this.set('model.mothersName', remitterData.mothersName);
    this.set('model.mNumber', remitterData.contactNo);
    this.set('model.email', remitterData.emailId);

    this.set('model.incomeRange', remitterData.incomeRange);
    this.set('model.expetedRemitance', remitterData.yearlyExpectedVolumeOfRemittance);
    this.set('model.remarks', remitterData.remarks);
    this.set('model.address1', remitterData.addressOne);
    this.set('model.address2', remitterData.addressTwo);
    this.set('model.cityOrTown', remitterData.town);
    this.set('model.zipCode', remitterData.zipCode);
    this.set('model.proofOfAddress', remitterData.proofOfAddressAndExpiryDate);
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
  setType() {
    let data = [
      {
        id: 1,
        type: "type",
        attributes: {
          name: "Individual"
        }
      },
      {
        id: 1,
        type: "type",
        attributes: {
          name: "Company"
        }
      },
    ];

    this.set("remittanceType", data);
  },

  setJobNature() {
    let data = [
      {
        id: 1,
        type: "type",
        attributes: {
          name: "Freelance"
        }
      },
      {
        id: 1,
        type: "type",
        attributes: {
          name: "Company"
        }
      },
    ];

    this.set("jobNature", data);
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
      context.set('locationId', msg.data.attributes.id);
    }).catch(function (errorMsg) {
      context.get('notifier').danger('Failed to Load Default Location Id');
    });
  },

  loadAllCountries() {
    let context = this;
    let accessToken = this.appConfiguration.getAccessToken();
    let allCountryData = this.rmsSetupService.getAllCountries(accessToken);

    allCountryData.then(function (msg) {
      context.set('countryList', msg.data);

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

    });
  },


  getNextAllowableStateForCreate(startStateId) {
    let context = this;
    let accessToken = this.appConfiguration.getAccessToken();
    let roleId = this.appConfiguration.getUserRoleId();

    this.serviceInitializer.getClassType(accessToken).then(function (result) {
      let classTypeId = result.data;//remitter classtype id
      console.log('classTypeId--classTypeId', classTypeId);
      let actionEventName = "create";

      context.serviceInitializer.getUserAbilityToCreate(accessToken, actionEventName, classTypeId, roleId).then(function (result) {
        if (result) {
          let status = {
            classTypeId: classTypeId,
            stateId: startStateId,
            roleId: roleId,
            actionEventId: result.data.id
          };
          context.rmsBaseService.getNextAllowableStateId(accessToken, status).then(function (result) {
            console.log('statusId', result.data.id);
            context.set('statusId', result.data.id);
          });
        }

      });
    });
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
        //this.selectedActionEvent(result.data.id,actionEventId);
        context.set('nextStatusId', result.data.id);
        console.log('nextStatusId', result.data.id);
      });

    });
  },


  dateToLongConversion(date) {
    let valueOne = date.replace("-", '');
    let dateToLong = valueOne.replace("-", '');
    return dateToLong;
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

  loadStateActions(activeStateId) {


    let context = this;
    let roleId = context.appConfiguration.getUserRoleId();
    let accessToken = this.appConfiguration.getAccessToken();
    context.serviceInitializer.getClassType(accessToken).then(function (result) {
      let classTypeId = result.data;

      let stateActionsPayload = {
        classTypeId: classTypeId,
        stateId: activeStateId,
        roleId: roleId
      };
      context.serviceInitializer.getStateActions(accessToken, stateActionsPayload).then(function (result) {

        try {
          context.set('stateActions', result.data);
        } catch (e) {
          context.set('stateActions', []);
        }
      })
    });
  },

  setAdditionalPropertyToModel(attributeData) {
    let recordArray = this.store.getReference('nges-engines/property-extender/additional-property', 1);
    let propertyData = attributeData.result;
    for (let i = 0; i < propertyData.length; i++) {
      recordArray[propertyData[i].code] = propertyData[i].value;
    }
  },

  actions: {
    reset() {
      this.set('model', {});
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

              if (validations.get('isValid')) {
                context.setProperties({
                  showAlert: false,
                  isRegistered: true,
                });

                let model = context.get('model');
                let primaryPhotoIssue = context.dateToLongConversion(model.primaryPhotoIssue);
                let primaryPhotoExpiry = context.dateToLongConversion(model.primaryPhotoExpiry);

                let dob = context.dateToLongConversion(model.dob);

                let secondaryPhotoIssue = context.dateToLongConversion(model.secondaryPhotoIssue);
                let secondaryPhotoExpiry = context.dateToLongConversion(model.secondaryPhotoExpiry);


                let remitterData = {
                  data: {
                    "id": model.remId,
                    "type": "remitters",
                    "attributes": {
                      "id": model.remId,
                      "fathersName": model.fathersName,
                      "type": model.type,
                      "mothersName": model.mothersName,
                      "code": model.code,
                      "contactNo": model.mNumber,
                      "emailId": model.email,
                      "addressOne": model.address1,
                      "addressTwo": model.address2,
                      "status": result.data.id,
                      "olcmState": {
                        "id": result.data.id,
                      },
                      "function": context.get('functionId'),
                      "location": context.get('locationId'),
                      "dateOfBirth": dob,
                      "risk": model.risk,
                      "country": {
                        "id": model.countryId
                      },
                      "state": {
                        "id": model.stateId
                      },

                      "town": model.cityOrTown,
                      "zipCode": model.zipCode,
                      "proofOfAddressAndExpiryDate": model.proofOfAddress,
                      "natureOfJob": model.noj,
                      "nationality": {
                        "id": model.nationalityId
                      },
                      "incomeRange": Number(model.incomeRange),
                      "yearlyExpectedVolumeOfRemittance": Number(model.expetedRemitance),
                      "remarks": model.remarks,
                      "primaryPhotoId": {
                        "id": "1",
                        "idType": {
                          "id": model.primaryPhotoId
                        },
                        "issueDate": primaryPhotoIssue,
                        "expiryDate": primaryPhotoExpiry,
                        "type": model.primaryPhotoType,
                      },
                      "secondaryPhotoId": {
                        "id": "1",
                        "idType": {
                          "id": model.secondaryPhotoId
                        },
                        "issueDate": secondaryPhotoIssue,
                        "expiryDate": secondaryPhotoExpiry,
                        "type": model.secondaryPhotoType
                      },
                      "name": model.remitterName
                    }
                  }
                };

                console.log('message--remitterData', JSON.stringify(remitterData));

                let accessToken = context.appConfiguration.getAccessToken();
                let afterRemitterUpdate = context.serviceInitializer.stateActionUpdate(accessToken, model.remId, remitterData);

                afterRemitterUpdate.then(function (msg) {
                  context.get('notifier').success('Remitter Data Updated And Send to Next State');
                }).catch(function (msg) {
                  if (msg.status === 204) {
                    context.get('notifier').success('Remitter Data Updated And Send to Next State');
                  } else {
                    context.get('notifier').danger('Remitter Data Update Failed!');
                  }
                });

              } else {
                context.get('notifier').danger('Fill up all the fields properly');
              }
            });
        });

      });
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

    onChangeTypes(value) {

      let context = this;
      context.defaultInitializer('type', value.attributes.name);
      console.log('onChangeTypes', value);
      context.set('selectedType', {
        label: (value === '') ? '' : value.attributes.name,
        value: value,
      });
    },

    onChangeNationality(value) {

      let context = this;
      context.defaultInitializer('nationality', value.attributes.name);
      context.defaultInitializer('nationalityId', value.id);
      console.log('onChangeNationality', value);
      context.set('selectedNationality', {
        label: (value === '') ? '' : value.attributes.name,
        value: value,
      })
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
      }).catch(function (errorMsg) {
        context.get('notifier').danger('Failed to Load Country List');
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
      context.defaultInitializer('noj', value.attributes.name);
      context.set('selectedNOJ', {
        label: (value === '') ? '' : value.attributes.name,
        value: value,
      });
    },

    onChangePrimaryPhotoType(value) {
      let context = this;
      context.defaultInitializer('primaryPhotoType', value.attributes.name);
      context.defaultInitializer('primaryPhotoId', value.id);
      context.set('selectedPrimaryPhotoType', {
        label: (value === '') ? '' : value.attributes.name,
        value: value,
      });
    },

    onChangeSecondaryPhotoType(value) {
      let context = this;
      context.defaultInitializer('secondaryPhotoType', value.attributes.name);
      context.defaultInitializer('secondaryPhotoId', value.id);
      context.set('selectedSecondaryPhotoType', {
        label: (value === '') ? '' : value.attributes.name,
        value: value,
      });
    },


    propertyExtend() {
      let context = this;
      this.set('attributePayload',[]);
      this.set('showPropertyExtender',true);
      let accessToken = this.appConfiguration.getAccessToken();

      let model = this.get('model');
      let attributeData = context.peSetupService.getAllAttributesDataByClassTypeId(model.remId,accessToken);

      attributeData.then(function (attribute) {
        console.log('message--allCreatedAttributeData', attribute);
        context.set('attributeData',attribute);
        context.setAdditionalPropertyToModel(attribute);
      }).catch(function (errorMsg) {
        context.get('notifier').danger('Failed To Load Attributes Data');
      });


      this.serviceInitializer.getClassType(accessToken).then(function (result) {
        let classTypeId = result.data;//classtype id

        let allCreatedAttribute = context.peSetupService.getAllAttributesByClassTypeId(classTypeId,accessToken);

        console.log('message--allCreatedAttribute', allCreatedAttribute);
        allCreatedAttribute.then(function (attribute) {
          console.log('message---attributeList--attributeList', attribute);
          context.set('attributeList',attribute);
        }).catch(function (errorMsg) {
          context.get('notifier').danger('Failed To Load Attributes');
        });

      });



    },

    updateAction() {

      let model = this.get('model');
      let recordArray = this.store.getReference('nges-engines/property-extender/additional-property',1);
      let context = this;
      let attributeList = this.get('attributeList');
      console.log('message--attributeList', attributeList);
      attributeList =  attributeList.result;
      for (let i = 0; i < attributeList.length; i++) {

        let record = {
          id: attributeList[i].id,
          type: attributeList[i].type,
          instanceId: model.remId,
          value: recordArray[attributeList[i].code],
          code: attributeList[i].code,
          describtion: 'n/a',
          createdBy: 'msi',
          createdAt: 1,
          lastUpdatedAt: 1,
          lastUpdatedBy: 'msi',
          comments: 'n/a',
          extra: 'n/a',
          name: "n/a",
          attribute: {
            id: attributeList[i].id,
          }
        };

        context.get('attributePayload').pushObject(record);
      }

      let recordPayload = this.get('attributePayload');
      console.log('message--record', JSON.stringify(recordPayload));
      //context.set('attributePayload',[]);

      let accessToken = this.appConfiguration.getAccessToken();
      let afterAddition = this.peSetupService.addNewPropertyData(accessToken, recordPayload);

      afterAddition.then(function (msg) {
        context.set('attributePayload',[]);
      }).catch(function (msg) {
        if (msg.status === 200) {
          context.get('notifier').success('Property Data Update Successful');
          context.set('attributePayload',[]);
        } else {
          context.get('notifier').danger('Property Data Update Failed!');
          context.set('attributePayload',[]);
        }
      });


      this.get('model').validate()
        .then(({validations}) => {

          this.set('didValidate', true);

          if (validations.get('isValid')) {
            this.setProperties({
              showAlert: false,
              isRegistered: true,
            });

            let model = this.get('model');
            let primaryPhotoIssue = this.dateToLongConversion(model.primaryPhotoIssue);
            let primaryPhotoExpiry = this.dateToLongConversion(model.primaryPhotoExpiry);

            let dob = this.dateToLongConversion(model.dob);

            let secondaryPhotoIssue = this.dateToLongConversion(model.secondaryPhotoIssue);
            let secondaryPhotoExpiry = this.dateToLongConversion(model.secondaryPhotoExpiry);


            let remitterData = {
              data: {
                "id": model.remId,
                "type": "remitters",
                "attributes": {
                  "id": model.remId,
                  "fathersName": model.fathersName,
                  "type": model.type,
                  "mothersName": model.mothersName,
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
                  "dateOfBirth": dob,
                  "risk": model.risk,
                  "country": {
                    "id": model.countryId
                  },
                  "state": {
                    "id": model.stateId
                  },

                  "town": model.cityOrTown,
                  "zipCode": model.zipCode,
                  "proofOfAddressAndExpiryDate": model.proofOfAddress,
                  "natureOfJob": model.noj,
                  "nationality": {
                    "id": model.nationalityId
                  },
                  "incomeRange": Number(model.incomeRange),
                  "yearlyExpectedVolumeOfRemittance": Number(model.expetedRemitance),
                  "remarks": model.remarks,
                  "primaryPhotoId": {
                    "id": "1",
                    "idType": {
                      "id": model.primaryPhotoId
                    },
                    "issueDate": primaryPhotoIssue,
                    "expiryDate": primaryPhotoExpiry,
                    "type": model.primaryPhotoType,
                  },
                  "secondaryPhotoId": {
                    "id": "1",
                    "idType": {
                      "id": model.secondaryPhotoId
                    },
                    "issueDate": secondaryPhotoIssue,
                    "expiryDate": secondaryPhotoExpiry,
                    "type": model.secondaryPhotoType
                  },
                  "name": model.remitterName
                }
              }
            };
            console.log('message--remitterData', JSON.stringify(remitterData));
            let accessToken = this.appConfiguration.getAccessToken();
            let afterRemitterUpdate = this.remitterActionService.updateRemitterData(accessToken, remitterData, model.remId);
            let context = this;
            afterRemitterUpdate.then(function (msg) {
              context.get('notifier').success('Remitter Data Update Successful');
            }).catch(function (msg) {
              if (msg.status === 204) {
                context.get('notifier').success('Remitter Data Update Successful');
              } else {
                context.get('notifier').danger('Remitter Data Update Failed!');
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

          if (validations.get('isValid')) {
            this.setProperties({
              showAlert: false,
              isRegistered: true,
            });

            let model = this.get('model');
            let primaryPhotoIssue = this.dateToLongConversion(model.primaryPhotoIssue);
            let primaryPhotoExpiry = this.dateToLongConversion(model.primaryPhotoExpiry);

            let dob = this.dateToLongConversion(model.dob);

            let secondaryPhotoIssue = this.dateToLongConversion(model.secondaryPhotoIssue);
            let secondaryPhotoExpiry = this.dateToLongConversion(model.secondaryPhotoExpiry);


            let remitterData = {
              data: {
                "id": model.remId,
                "type": "remitters",
                "attributes": {
                  "id": model.remId,
                  "fathersName": model.fathersName,
                  "type": model.type,
                  "mothersName": model.mothersName,
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
                  "dateOfBirth": dob,
                  "risk": model.risk,
                  "country": {
                    "id": model.countryId
                  },
                  "state": {
                    "id": model.stateId
                  },

                  "town": model.cityOrTown,
                  "zipCode": model.zipCode,
                  "proofOfAddressAndExpiryDate": model.proofOfAddress,
                  "natureOfJob": model.noj,
                  "nationality": {
                    "id": model.nationalityId
                  },
                  "incomeRange": Number(model.incomeRange),
                  "yearlyExpectedVolumeOfRemittance": Number(model.expetedRemitance),
                  "remarks": model.remarks,
                  "primaryPhotoId": {
                    "id": "1",
                    "idType": {
                      "id": model.primaryPhotoId
                    },
                    "issueDate": primaryPhotoIssue,
                    "expiryDate": primaryPhotoExpiry,
                    "type": model.primaryPhotoType,
                  },
                  "secondaryPhotoId": {
                    "id": "1",
                    "idType": {
                      "id": model.secondaryPhotoId
                    },
                    "issueDate": secondaryPhotoIssue,
                    "expiryDate": secondaryPhotoExpiry,
                    "type": model.secondaryPhotoType
                  },
                  "name": model.remitterName
                }
              }
            };
            console.log('message--remitterData', JSON.stringify(remitterData));
            let accessToken = this.appConfiguration.getAccessToken();
            let afterRemitterRegistration = this.remitterActionService.addNewRemitter(accessToken, remitterData);
            let context = this;
            afterRemitterRegistration.then(function (msg) {
            }).catch(function (msg) {
              if (msg.status === 201) {
                context.get('notifier').success('Remitter Registration Successful');
              } else {
                context.get('notifier').danger('Remitter Registration Failed!');
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
      this.set('source', '5%');
      this.set('name', '15%');
      this.set('country', '5%');
      this.set('dob', '5%');
      this.set('fname', '10%');
      this.set('score', '40%');
      this.set('risk', 'medium');

    },


    checkDuplicate() {
      console.log('message-checkDuplicate', 'checkDuplicate');
    }
  }

})

let convert = (date) => {
  date = date.toString();
  let year = date.substring(0, 4);
  let month = date.substring(4, 6);
  let day = date.substring(6, 8);
  return `${year}-${month}-${day}`
};
