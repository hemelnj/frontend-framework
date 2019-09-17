import Component from '@ember/component';
import {inject as service} from '@ember/service';

let DEFAULT_SELECTED_TAB_CODE = 'allStates';


export default Component.extend({

  appWelcome: service('nges-core/app-welcome'),
  store: service(),
  appConfiguration: service('app-configuration'),
  ngesTabTableService: service('nges-elements/nges-tab-table'),
  serviceInitializer: service('nges-services/service-initializer'),
  notifier: service(),

  init() {
    this._super(...arguments);

    let routeInfo = this.get('routeInformation');
    console.log('messager-----------outeInformationrouteInformation', routeInfo);
  },

})
