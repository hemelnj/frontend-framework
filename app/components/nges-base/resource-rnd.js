import Component from '@ember/component';
import {inject as service} from '@ember/service';


let PAGINATE_LIMIT = 5;

export default Component.extend({

  store: service(),
  notifier: service(),
  appWelcome: service('nges-core/app-welcome'),
  appConfiguration: service('app-configuration'),
  serviceInitializer: service('nges-services/service-initializer'),
  init() {
    this._super(...arguments);

    let context = this;
  },

  actions: {

  }

});
