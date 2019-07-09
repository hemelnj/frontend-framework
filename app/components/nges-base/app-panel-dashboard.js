import Component from '@ember/component';
import {inject as service} from '@ember/service';
import config from 'frontend-engine/config/environment';

export default Component.extend({


  appName: config.APP.appName,
  appLogo: config.APP.appLogo,
  intl: service(),
  appConfiguration: service('app-configuration'),
  appRestTemplate: service('app-rest-template'),
  appWelcome: service('nges-core/app-welcome'),
  notifier: service(),
  router: service(),
  actions: {

    changeLocaleENG(){
      this.get('intl').setLocale(['en-us']);
    },
    changeLocaleBNG(){
      this.get('intl').setLocale(['bn-ln']);
    }
  },


});
