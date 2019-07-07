import Component from '@ember/component';
import config from 'frontend-engine/config/environment';
import {inject as service} from '@ember/service';
import $ from "jquery";

export default Component.extend({

  store: service(),
  appConfiguration: service('app-configuration'),
  peSetupService: service('nges-engines/property-extender/pe-setup'),

  peFormData: {
    stringName:'',
    stringId:'',
  },

  notifier: service(),

  init() {
    this._super(...arguments);
    this.set('attribute', []);
  },

  didReceiveAttrs() {
    this._super(...arguments);
    this.set('attributes',this.get('attributeList'));
  },

  actions: {


    addAction() {


      let attributes = this.get('attributes');
      console.log('message--attributes', attributes.result);


      let context = this;

      for (let i=0;i<attributes.result.length;i++) {
        let record = {
          id:attributes.result[i].id,
          type:attributes.result[i].type,
          instanceId:attributes.result[i].classTypeId,
          value: attributes.result[i].name,
          code: 'n/a',
          describtion: 'n/a',
          createdBy: 'msi',
          createdAt:1,
          lastUpdatedAt:1,
          lastUpdatedBy:'msi',
          comments:'n/a',
          extra: 'n/a',
          name:"n/a",
          attribute: {
            id:attributes.result[i].id,
          }
        };

        context.get('attribute').pushObject(record);
      }

      let payload = this.get('attribute');
      console.log('message', payload);

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
