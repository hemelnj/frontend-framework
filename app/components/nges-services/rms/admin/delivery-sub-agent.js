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


    console.log('message', ' delivery sub agent page');


    this.set('serviceActionableRoute', {
      create: {
        routePath: 'create-delivery-sub-agent',
        label: 'New Delivery Sub-Agent',
      },
      edit: {
        routePath: 'edit-delivery-sub-agent',
        label: 'View Delivery Sub-Agent',
      }
    });



  },



})
