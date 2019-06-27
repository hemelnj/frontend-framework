import Component from '@ember/component';
import {inject as service} from '@ember/service';
import config from 'frontend-engine/config/environment';

export default Component.extend({

  authEngineHost: config.NGES_SERVICE_HOSTS.AUTH_SERVICE_HOST,
  appLogin: service('nges-core/app-login'),
  router: service(),
  errorMsg: '',
  init() {
    this._super(...arguments);
  },

  changePasswordRequest(userData) {


    let context = this;


    /*$.ajax({
      type: "POST",
      url: context.authEngineHost+"/users/passwordRecover",

      data: JSON.stringify(userData),
      dataType: "json",

      beforeSend: function (xhr) {
        xhr.setRequestHeader('content-type', 'application/json');
      },

      statusCode: {
        400: function (msg) {
          console.log('message-post-data', 'update Password failure');
          context.set('errorMsg',msg.responseJSON.message);
        },
        200:function(){
          console.log('message-post-data', 'successful pass req');
          context.get('router').transitionTo('login');
        }
      },
    });*/
  },


  actions: {
    updatePassword(newPassword, rePassword) {
      let context = this;
      let userData = {
        data: {
          type: "users",
          attributes: {
            email: localStorage.getItem('email_address'),
            code: localStorage.getItem('email_received_code'),
            password: newPassword
          },
          "id": 6
        }
      };

      if (newPassword === rePassword) {
        this.set('passNotMatched', false);

        this.appLogin.updatePasswordAfterGettingCode(userData).then(function (result) {

        }).catch(function (msg) {
          if(msg.status === 200){
            context.get('router').transitionTo('login');
          }
          context.set('errorMsg',JSON.parse(msg.responseText).message);
        })

      } else {
        this.set('passNotMatched', true);
      }

    }
  }
});
