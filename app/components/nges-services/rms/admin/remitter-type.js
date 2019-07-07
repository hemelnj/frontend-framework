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


    this.set('serviceActionableRoute', {
      create: {
        routePath: 'create-remitter-type',
        label: 'New remitter Type',
      },
      edit: {
        routePath: 'edit-remitter-type',
        label: 'View remitter Type',
      }
    });



  },



})
