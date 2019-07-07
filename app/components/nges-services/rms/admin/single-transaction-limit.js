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


    console.log('message', ' single transaction limit page');


    this.set('serviceActionableRoute', {
      create: {
        routePath: 'create-single-transaction-limit',
        label: 'New Single Transaction Limit',
      },
      edit: {
        routePath: 'edit-single-transaction-limit',
        label: 'View Single Transaction Limit',
      }
    });



  },



})
