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


    console.log('message', ' payment mode page');


    this.set('serviceActionableRoute', {
      create: {
        routePath: 'create-payment-mode',
        label: 'New Payment Mode',
      },
      edit: {
        routePath: 'edit-payment-mode',
        label: 'View Payment Mode',
      }
    });



  },



})
