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


    console.log('message', ' exchange rate page');


    this.set('serviceActionableRoute', {
      create: {
        routePath: 'create-exchange-rate',
        label: 'New Exchange Rate',
      },
      edit: {
        routePath: 'edit-exchange-rate',
        label: 'View Exchange Rate',
      }
    });



  },



})
