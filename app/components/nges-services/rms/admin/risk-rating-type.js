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


    console.log('message', ' risk-rating-type page');


    this.set('serviceActionableRoute', {
      create: {
        routePath: 'create-risk-rating-type',
        label: 'New Risk Rating Type',
      },
      edit: {
        routePath: 'edit-risk-rating-type',
        label: 'View Risk Rating Type',
      }
    });



  },



})
