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


    console.log('message', ' photo id');


    this.set('serviceActionableRoute', {
      create: {
        routePath: 'create-photoid',
        label: 'New Photo Id',
      },
      edit: {
        routePath: 'edit-photoid',
        label: 'View Photo Id',
      }
    });



  },



})
