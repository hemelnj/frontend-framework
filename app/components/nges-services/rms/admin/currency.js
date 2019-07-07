import Component from '@ember/component';
import Service, {inject as service} from '@ember/service';


export default Component.extend({

  store: service(),
  notifier: service(),
  appWelcome: service('nges-core/app-welcome'),
  appConfiguration: service('app-configuration'),
  rmsBaseService: service('nges-services/rms/rms-base-service'),
  init(){
    this._super(...arguments);


    console.log('message', ' currency page');


    this.set('serviceActionableRoute', {
      create: {
        routePath: 'create-currency',
        label: 'New Currency',
      },
      edit: {
        routePath: 'edit-currency',
        label: 'View Currency',
      }
    });



  },



})
