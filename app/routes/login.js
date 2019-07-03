import Route from '@ember/routing/route';
import {inject as service} from '@ember/service';
import config from 'frontend-engine/config/environment';

import Authorization from '../mixins/authorization'


export default Route.extend(Authorization, {

  appLogo: config.APP.appLogo,
  appConfiguration: service('app-configuration'),
  appRestTemplate: service('app-rest-template'),
  model(service_data, transition) {

    return {
      appLogo: this.appLogo
    }
  },
  beforeModel() {

    if (this.isAuthorization()) {
      this.transitionTo("welcome");
    }
  },

  /*setupController(controller, model) {
    console.log('message', 'setupController ', model);
    this.set('appLogo', this.appLogo);
  },*/

});
