import Component from '@ember/component';
import config from 'frontend-engine/config/environment';
import {inject as service} from '@ember/service';
import $ from "jquery";

export default Component.extend({

  store: service(),
  appConfiguration: service('app-configuration'),
  peSetupService: service('nges-engines/property-extender/pe-setup'),
  olmSetupService: service('nges-engines/olm/olm-setup'),

  formData: {
    olmObject: null,
  },

  notifier: service(),

  init() {
    this._super(...arguments);
    this.set('model', this.store.createRecord('nges-engines/property-extender/property-extender'));
    this.setType();
    this.loadAllOLMObject();
    this.set('attributeList', []);
  },

  didUpdateAttrs() {
    this._super(...arguments);
    this.set('tmpClassTypeList', this.get('classTypeList'));
  },

  loadAllOLMObject() {

    let context = this;
    let accessToken = this.appConfiguration.getAccessToken();
    let appCode = this.appConfiguration.getApplicationCode();
    let orgCode = this.appConfiguration.getOrganizationCode();
    let engineCode = "olm";
    let allCreatedClassTypes = this.olmSetupService.getAllClassType(orgCode,appCode,engineCode,accessToken);

    allCreatedClassTypes.then(function (classType) {
      context.set('classTypeList', classType.data);
      context.set('tmpClassTypeList', classType.data);
      context.didUpdateAttrs();
    }).catch(function (errorMsg) {
      context.get('notifier').danger('Failed to Load OLM Objects');
    });

  },

  setModel(classType) {
    console.log('message--setModel', classType);

    this.set('model.classTypeId', classType.attributes.id);
    this.set('model.classTypeCode', classType.attributes.code);
    this.set('model.classTypeName', classType.attributes.name);
    this.set('model.displayName', classType.attributes.displayName);

  },

  setType() {
    let data = [
      {
        id: 1,
        type: "type",
        attributes: {
          name: "Integer"
        }
      },
      {
        id: 2,
        type: "type",
        attributes: {
          name: "Varchar"
        }
      },
      {
        id: 3,
        type: "type",
        attributes: {
          name: "String"
        }
      },
      {
        id: 4,
        type: "type",
        attributes: {
          name: "Reference Object"
        }
      },
    ];

    this.set("typeList", data);
  },

  defaultInitializer(propertyName, value) {
    this.set('model.' + propertyName, value);
  },

  actions: {

    selectOlmObject(selectedClasstype) {
      this.set('attributeList', []);
      let context = this;
      context.set('formData.olmObject', selectedClasstype.attributes.name);
      let selectedClasstypeId = selectedClasstype.id;
      this.set('selectedClasstypeId', selectedClasstypeId);
      let refObjectList = this.get('tmpClassTypeList');

      for (let i = 0; i < refObjectList.length; i++) {
        if (refObjectList[i].id === selectedClasstypeId) {
          refObjectList.splice(i, 1);
        }
      }

      this.set('refObjectList', refObjectList);

      this.loadAllOLMObject();
      console.log('refObjectList', refObjectList);

      let accessToken = this.appConfiguration.getAccessToken();

      console.log('message--onChangeType', selectedClasstypeId);

      let allCreatedAttributes = this.peSetupService.getAllAttributesByClassTypeId(selectedClasstypeId, accessToken);

      allCreatedAttributes.then(function (classType) {
        console.log('message--propertyList', classType.result);
        context.set('propertyList', classType.result);
      }).catch(function (errorMsg) {
        context.get('notifier').danger('Failed To Load OLM Objects');
      });
    },

    onChangeType(value) {
      let onChangeType = value.attributes.name;
      this.defaultInitializer('type', onChangeType);
      if (onChangeType === "Reference Object") {
        this.defaultInitializer('typeLength', "");
        this.set('showRefObjectDropDown', true);
        this.set('showTypeLengthField', false);
      } else {
        this.set('showRefObjectDropDown', false);
        this.set('showTypeLengthField', true);
      }
    },

    onChangeRefObject(value) {
      console.log('ref object', value.attributes.name);
      this.defaultInitializer('refObject', value.attributes.name);
    },

    editAction(selectedItemId) {
      let context = this;

      let accessToken = this.appConfiguration.getAccessToken();

      let allCreatedAttributes = this.peSetupService.getAttributesByClassTypeId(selectedItemId, accessToken);

      allCreatedAttributes.then(function (classType) {
        context.set('attributeList', classType.data);
        console.log('message-attributeList', classType);
      }).catch(function (errorMsg) {
        context.get('notifier').danger('Failed To Load OLM Objects');
      });

      context.set('visibility', true);

    },

    editAttributeAction(selectedItemId) {
      let context = this;

      let accessToken = this.appConfiguration.getAccessToken();

      let allCreatedAttributes = this.peSetupService.getAllAttributesByClassTypeId(selectedItemId, accessToken);

      allCreatedAttributes.then(function (classType) {
        context.set('attributeList', classType.data);
        console.log('message-attributeList', classType.data);
      }).catch(function (errorMsg) {
        context.get('notifier').danger('Failed To Load OLM Objects');
      });

      context.set('visibility', true);

    },


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

            /*let payload = {
              data: {
                "id": model.classTypeId,
                "type": "classtypes",
                "attributes": {
                  "code": model.classTypeCode,
                  "name": model.classTypeName,
                  "displayName": model.displayName,
                }
              }
            };*/

            if (model.refObject === '' || model.refObject === undefined || model.refObject === null) {
              this.set('model.refObject', "n/a");
            }

            if (model.typeLength === '' || model.typeLength === undefined || model.typeLength === null) {
              this.set('model.typeLength', "n/a");
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
