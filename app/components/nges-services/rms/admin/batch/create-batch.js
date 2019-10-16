import Component from '@ember/component';
import Service, {inject as service} from '@ember/service';


export default Component.extend({

  appWelcome: service('nges-core/app-welcome'),
  store: service(),
  showAlert: false,
  isRegistered: false,
  didValidate: false,

  appConfiguration: service('app-configuration'),
  batchActionService: service('nges-services/rms/batch-action'),
  rmsBaseService: service('nges-services/rms/rms-base-service'),
  serviceInitializer: service('nges-services/service-initializer'),
  notifier: service(),

  init() {
    this._super(...arguments);

    this.set('model', this.store.createRecord('nges-services/rms/batch-process'));

    let startStateId = this.appWelcome.getStartStateId();
    this.getNextAllowableStateForCreate(startStateId);
    this.getDefaultUserFunctionId();
    this.getDefaultUserLocationId();
    this.setRequestType();
  },

  setRequestType() {
    let data = [
      {
        id: 1,
        type: "request",
        attributes: {
          name: "GET"
        }
      },
      {
        id: 2,
        type: "request",
        attributes: {
          name: "POST"
        }
      },
      {
        id: 3,
        type: "request",
        attributes: {
          name: "PUT"
        }
      },
      {
        id: 4,
        type: "request",
        attributes: {
          name: "PATCH"
        }
      },
    ];

    this.set("requestTypeList", data);
  },

  getNextAllowableStateForCreate(startStateId) {
    let context = this;
    let accessToken = this.appConfiguration.getAccessToken();
    let roleId = this.appConfiguration.getUserRoleId();

    this.serviceInitializer.getClassType(accessToken).then(function (result) {
      let classTypeId = result.data;//remitter classtype id

      let actionEventName = "create";

      context.serviceInitializer.getUserAbilityToCreate(accessToken, actionEventName, classTypeId, roleId).then(function (result) {
        if (result) {
          let status = {
            classTypeId: classTypeId,
            stateId: startStateId,
            roleId: roleId,
            actionEventId: result.data.id
          };
          console.log('classTypeId--status', status);
          context.rmsBaseService.getNextAllowableStateId(accessToken, status).then(function (result) {

            if (result) {
              console.log('statusId', result.data.id);
              context.set('statusId', result.data.id);
            }

          });
        }

      });
    });
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


  defaultInitializer(propertyName, value) {
    this.set('model.' + propertyName, value);
  },


  actions:{


    onChangeRequestType(value) {
      let context = this;
      context.defaultInitializer('batchReqType', value.attributes.name);
      console.log('onChangeRequestType', value);
      context.set('selectedRequestType', {
        label: (value === '') ? '' : value.attributes.name,
        value: value,
      });
    },

    saveAction() {

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

            let payload = {
              data: {
                "id": model.batchId,
                "type": "batchProcess",
                "attributes": {
                  "id": model.batchId,
                  "name": model.batchName,
                  "api": model.batchApi,
                  "requestType": model.batchReqType,
                  "function": this.get('functionId'),
                  "location": this.get('locationId'),
                  "createdAt": 1,
                  "createdBy": 'n/a',
                  "updatedAt": 1,
                  "updatedBy": 'n/a',
                  "olcmState": {
                    "id": this.get('statusId'),
                  },

                }
              }
            };
            console.log('message--batch', JSON.stringify(payload));
            let accessToken = this.appConfiguration.getAccessToken();
            let afterBatchRegistration = this.batchActionService.addNewBatch(accessToken, payload);
            let context = this;
            afterBatchRegistration.then(function (msg) {
            }).catch(function (msg) {
              if (msg.status === 201) {
                context.get('notifier').success('Batch Added Successful');
              } else {
                context.get('notifier').danger('Batch Added Failed!');
              }
            });

          } else {
            let context = this;
            context.get('notifier').danger('Fill up all the fields properly');
          }
        });
    },
  }


})
