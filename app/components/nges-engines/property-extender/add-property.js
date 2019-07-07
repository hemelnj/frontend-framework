import Component from '@ember/component';
import config from 'frontend-engine/config/environment';
import {inject as service} from '@ember/service';
import $ from "jquery";

export default Component.extend({

  store: service(),
  appConfiguration: service('app-configuration'),
  peSetupService: service('nges-engines/property-extender/pe-setup'),

  formData: {
    olmObject: null,
  },

  notifier: service(),

  init() {
    this._super(...arguments);
    this.set('attributeList', this.get('attributeList'));
  },


  actions: {

    addAction() {

      let optional = document.getElementById("optional").checked;
      this.get('model').validate()
        .then(({validations}) => {

          this.set('didValidate', true);

          let model = this.get('model');

          if (validations.get('isValid')) {
            this.setProperties({
              showAlert: false,
              isRegistered: true,
            });

            if(model.refObject === '' || model.refObject === undefined || model.refObject === null){
              this.set('model.refObject',"n/a");
            }

            if(model.typeLength === '' || model.typeLength === undefined || model.typeLength === null){
              this.set('model.typeLength',"n/a");
            }

            let classTypeId = this.get('selectedClasstypeId');
            let payload = {


              "id": classTypeId,
              "classTypeId": classTypeId,
              "code": model.classTypeCode,
              "name": model.classTypeName,
              "displayName": model.displayName,
              "describtion": "n/a",
              "createdBy": "n/a",
              "createdAt": 1,
              "lastUpdatedAt": 1,
              "lastUpdatedBy": "n/a",
              "comments": "n/a",
              "extra": "n/a",
              "type": model.type,
              "length": model.typeLength,
              "constraint": "n/a",
              "optional": optional,
              "referenceObject": model.refObject,
            };

            let context = this;
            context.get('attributeList').pushObject(payload);

          } else {
            this.set('showAlert', true);
          }
        });
    },
    saveAction() {
      let attributeList = this.get('attributeList');
      console.log('message--sending payload', JSON.stringify(attributeList));
      let accessToken = this.appConfiguration.getAccessToken();
      let afterPropertyRegistration = this.peSetupService.addNewProperty(accessToken, attributeList);
      let context = this;
      afterPropertyRegistration.then(function (msg) {
        context.get('notifier').success('Property Add Successful');
      }).catch(function (msg) {
        context.get('notifier').danger('Failed to Save');
      });
    },
  }

})
