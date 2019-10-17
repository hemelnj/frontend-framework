import Component from '@ember/component';
import {inject as service} from '@ember/service';

export default Component.extend({


  appTemplateSetup: service('app-template-setup'),
  appWelcome: service('nges-core/app-welcome'),
  store: service(),
  appConfiguration: service('app-configuration'),
  ngesTabTableService: service('nges-elements/nges-tab-table'),
  serviceInitializer: service('nges-services/service-initializer'),
  notifier: service(),

  init() {
    this._super(...arguments);
    this.loadLanguage();
  },

  loadLanguage(){
    let data = [
      {
        id: 1,
        type: "language",
        attributes: {
          name: "Bengali"
        }
      },
      {
        id: 2,
        type: "language",
        attributes: {
          name: "English"
        }
      }
    ];

    this.set("languageList", data);
  },
  actions: {
    onSelectLanguage(value){
      console.log('message-onSelectLanguage', value);
    }
  }

})
