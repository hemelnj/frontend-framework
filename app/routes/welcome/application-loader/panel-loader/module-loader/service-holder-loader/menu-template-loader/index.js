import Route from '@ember/routing/route';
import {inject as service} from '@ember/service';

export default Route.extend({




  appTemplateSetup: service('app-template-setup'),
  model(service_menu, transition) {

    let routeInfos = transition.routeInfos;
    //console.log('message', routeInfos);

  }


});
