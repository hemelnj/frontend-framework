import Component from '@ember/component';
import {inject as service} from '@ember/service';

export default Component.extend({

  store: service(),
  notifier: service(),
  appWelcome: service('nges-core/app-welcome'),
  appConfiguration: service('app-configuration'),
  serviceInitializer: service('nges-services/service-initializer'),
  init(){
    this._super(...arguments);


    this.set('serviceActionableRoute', {
      create: {
        routePath: 'create-remitter',
        label: 'New Remitter',
      },
      edit: {
        routePath: 'edit-remitter',
        label: 'View Remitter',
      }
    });

  },

});
