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


    console.log('message', ' yearly transaction limit page');


    this.set('serviceActionableRoute', {
      create: {
        routePath: 'create-yearly-transaction-limit',
        label: 'New Yearly Transaction Limit',
      },
      edit: {
        routePath: 'edit-yearly-transaction-limit',
        label: 'View Yearly Transaction Limit',
      }
    });



  },



})
