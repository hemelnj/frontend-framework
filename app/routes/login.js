import Route from '@ember/routing/route';
import {inject as service} from '@ember/service';


import Authorization from '../mixins/authorization'


export default Route.extend(Authorization, {

  appConfiguration: service('app-configuration'),
  appRestTemplate: service('app-rest-template'),
  beforeModel() {

    if (this.isAuthorization()) {
      this.transitionTo("welcome");
    }

  },

  setupController(controller, model) {
    console.log('message', 'setupController ', model);
  },

});
