import Component from '@ember/component';
import { inject as service } from '@ember/service';
import config from 'frontend-engine/config/environment';
export default Component.extend({

  router: service(),
  authEngineHost:config.NGES_SERVICE_HOSTS.AUTH_SERVICE_HOST,
  appLogin: service('nges-core/app-login'),

  email: '',

  init() {
    this._super(...arguments);
    this.set('appearCodeField',false);
  },


  actions: {
    sendCodeRequest(email) {
      console.log('message-requestEmail', email);

      localStorage.setItem("email_address", email);
      let userData={
        data:{
          type:"users",
          attributes:{
            email: email
          }
        }
      };

      let context = this;


      context.appLogin.requestCodeForForgotPassword(userData).then(function () {

      }).catch(function () {
        context.set('appearCodeField',true);
      });
    },


    sendReceivedCode(code){
      let context = this;
      console.log('message-code', code);
      localStorage.setItem("email_received_code", code);
      context.get('router').transitionTo('add-new-password');
    }
  }
});
