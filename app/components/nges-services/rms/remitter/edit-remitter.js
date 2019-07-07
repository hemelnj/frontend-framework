import Component from '@ember/component';
import Service, {inject as service} from '@ember/service';


export default Component.extend({


  appConfiguration: service('app-configuration'),
  remitterActionService: service('nges-services/rms/remitter-action'),

  init() {
    this._super(...arguments);

    let routeParams = this.appConfiguration.getRouteParams();

    this.set('actionAccess',routeParams.actionAccess);

    let remitterId = this.appConfiguration.getRouteParams().stateRecord.id;


    console.log('message--remitterId', remitterId);
    this.loadRemitterDataById(remitterId);
  },

  loadRemitterDataById(remitterId) {

    let context = this;
    let accessToken = this.appConfiguration.getAccessToken();
    let allCountryData = this.remitterActionService.getRemitterDataById(remitterId,accessToken);

    allCountryData.then(function (msg) {

      context.set('remitterData',{
        type:'edit',
        data: msg.data.attributes,
      });
    });
  },


})
