import Route from '@ember/routing/route';
import {inject as service} from '@ember/service';

export default Route.extend({


  appWelcome: service('nges-core/app-welcome'),

  model(application_route) {

  }


});
