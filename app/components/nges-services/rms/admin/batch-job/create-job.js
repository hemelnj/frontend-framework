import Component from '@ember/component';
import Service, {inject as service} from '@ember/service';
import $ from "jquery";


export default Component.extend({

  appWelcome: service('nges-core/app-welcome'),
  store: service(),
  showAlert: false,
  isRegistered: false,
  didValidate: false,

  appConfiguration: service('app-configuration'),
  batchActionService: service('nges-services/rms/batch-action'),
  jobActionService: service('nges-services/rms/job-action'),
  rmsBaseService: service('nges-services/rms/rms-base-service'),
  serviceInitializer: service('nges-services/service-initializer'),
  notifier: service(),

  init() {
    this._super(...arguments);

    this.set('model', this.store.createRecord('nges-services/rms/batch-job'));

    let startStateId = this.appWelcome.getStartStateId();
    this.getNextAllowableStateForCreate(startStateId);
    this.getDefaultUserFunctionId();
    this.getDefaultUserLocationId();
    this.setRequestType();
    this.loadBatch();
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

  loadBatch() {
    let context = this;
    let accessToken = this.appConfiguration.getAccessToken();
    let allBatch = this.batchActionService.getAllBatch(accessToken);

    allBatch.then(function (msg) {
      console.log('message---batchList', msg);
      context.set('batchList', msg.data);
    }).catch(function (errorMsg) {
      context.get('notifier').danger('Failed to Load Country List');
    });
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

      let selectedBatch = $('#batch option:selected').toArray().map(item => item.value);

      selectedBatch = JSON.parse(selectedBatch);
      /*let text = $('#batch option:selected').toArray().map(item => item.value + ':' + item.text).join();
      let selectedBatch = [];

      let tmp = text.split(',');

      for (let i = 0; i < tmp.length; i++) {
        let batch_data = tmp[i].split(':');
        let p = {
          id: batch_data[0],
        };
        selectedBatch.push(p);
      }*/

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
                "id": model.jobId,
                "type": "job",
                "attributes": {
                  "id": model.jobId,
                  "name": model.jobName,
                  "processes": selectedBatch,
                  "schedulerType": 'n/a',
                  "scheduledTime": 1,
                  "scheduledDate": 1,
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
            let afterBatchRegistration = this.jobActionService.addNewJob(accessToken, payload);
            let context = this;
            afterBatchRegistration.then(function (msg) {
            }).catch(function (msg) {
              if (msg.status === 201) {
                context.get('notifier').success('Job Added Successful');
              } else {
                context.get('notifier').danger('Job Added Failed!');
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
