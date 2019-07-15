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

    this.set('model', this.store.createRecord('nges-services/rms/job-process'));

    let startStateId = this.appWelcome.getStartStateId();
    this.getNextAllowableStateForCreate(startStateId);
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

  actions:{
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
                  "function": model.batchReqType,
                  "location": model.batchReqType,
                  "createdAt": model.batchReqType,
                  "createdBy": model.batchReqType,
                  "updatedAt": model.batchReqType,
                  "updatedBy": model.batchReqType,
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
