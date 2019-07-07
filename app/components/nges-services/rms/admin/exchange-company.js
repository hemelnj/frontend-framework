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


    console.log('message', ' exchange company page');


    this.set('serviceActionableRoute', {
      create: {
        routePath: 'create-exchange-company',
        label: 'New Exchange Company',
      },
      edit: {
        routePath: 'edit-exchange-company',
        label: 'View Exchange Company',
      }
    });



  },



})
