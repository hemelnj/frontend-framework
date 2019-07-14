import Component from '@ember/component';
import config from 'frontend-engine/config/environment';
import {inject as service} from '@ember/service';
import $ from "jquery";

export default Component.extend({

  store: service(),
  appConfiguration: service('app-configuration'),
  peSetupService: service('nges-engines/property-extender/pe-setup'),

  peFormData: {
    string: '',
    integer: '',
    varchar: '',
  },

  notifier: service(),

  init() {
    this._super(...arguments);
    this.set('attributePayload', []);
  },

  didReceiveAttrs() {
    this._super(...arguments);
    this.set('attributes', this.get('attributeList'));
  },

  actions: {


    addAction() {


      let attributes = this.get('attributes');
      console.log('message--attributes', attributes.result);


      let context = this;

      for (let i = 0; i < attributes.result.length; i++) {

        if(attributes.result[i].type === "String"){
          let value = context.peFormData.string;
          context.set('value',value);
        }
        if(attributes.result[i].type === "Integer"){
          let value = context.peFormData.integer;
          context.set('value',value);
        }
        if(attributes.result[i].type === "Varchar"){
          let value = context.peFormData.varchar;
          context.set('value',value);
        }
        let record = {
          id: attributes.result[i].id,
          type: attributes.result[i].type,
          instanceId: attributes.result[i].classTypeId,
          value: context.get('value'),
          code: 'n/a',
          describtion: 'n/a',
          createdBy: 'msi',
          createdAt: 1,
          lastUpdatedAt: 1,
          lastUpdatedBy: 'msi',
          comments: 'n/a',
          extra: 'n/a',
          name: "n/a",
          attribute: {
            id: attributes.result[i].id,
          }
        };

        context.get('attributePayload').pushObject(record);
      }

      let payload = this.get('attributePayload');
      console.log('message', payload);
      this.set('attributePayload', []);

      /*let accessToken = this.appConfiguration.getAccessToken();
      let responseAfterAddingState = this.olmSetupService.addNewState(stateData, accessToken);
      let context = this;
      responseAfterAddingState.then(function (msg) {
        if (msg) {
          console.log('responseAfterAddingState', msg);
          context.get('notifier').success('New State Added');
          context.dataInit(classType.id);
        } else {
          context.get('notifier').danger('Failed To Add');
        }
      });*/

    }
  }

})
