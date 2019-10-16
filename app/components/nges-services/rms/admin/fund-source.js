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


    console.log('message', ' fund source');


    this.set('serviceActionableRoute', {
      create: {
        routePath: 'create-fund-source',
        label: 'New Fund Source',
      },
      edit: {
        routePath: 'edit-fund-source',
        label: 'View Fund Source',
      }
    });



  },



})
