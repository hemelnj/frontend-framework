import Component from '@ember/component';
import Service, {inject as service} from '@ember/service';


export default Component.extend({


  appConfiguration: service('app-configuration'),
  beneficiaryActionService: service('nges-services/rms/beneficiary-action'),
  init() {
    this._super(...arguments);


    let routeParams = this.appConfiguration.getRouteURLParams();

    this.set('actionAccess',routeParams.editAccess);

    let beneficiaryId = routeParams.stateRecordId;

    console.log('message--beneficiaryId', beneficiaryId);
    this.loadBeneficiaryDataById(beneficiaryId);
  },

  loadBeneficiaryDataById(beneficiaryId) {
    let context = this;
    let accessToken = this.appConfiguration.getAccessToken();
    let allCountryData = this.beneficiaryActionService.getBeneficiaryDataById(beneficiaryId,accessToken);

    allCountryData.then(function (msg) {

      context.set('beneficiaryData',{
        type:'edit',
        data:msg.data.attributes,
      });
    });
  },


})
