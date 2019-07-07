import Component from '@ember/component';
import config from 'frontend-engine/config/environment';
import {inject as service} from '@ember/service';
import $ from "jquery";

export default Component.extend({

  store: service(),
  appConfiguration: service('app-configuration'),
  peSetupService: service('nges-engines/property-extender/pe-setup'),

  peFormData: {
    string:{
      name:'',
      id:''
    },
  },

  notifier: service(),

  init() {
    this._super(...arguments);
  },


  actions: {

    addAction() {

      let string = this.get('peFormData.string.name');
      let stringId = this.get('peFormData.string.id');

      console.log('message-peFormData-name', string,stringId);


      let payload = [{

      }];

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
