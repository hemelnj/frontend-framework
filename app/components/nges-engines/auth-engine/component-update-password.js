import Component from '@ember/component';
import {inject as service} from '@ember/service';
import config from 'frontend-engine/config/environment';

export default Component.extend({
  router: service(),
  errorMsg: '',
  showmessage: false,


  appAuthEngine: service('nges-engines/auth-engine/app-auth-engine'),
  appConfiguration: service('app-configuration'),
  appAuthEngineCredential: service('nges-engines/auth-engine/app-auth-engine-credential'),

  notifier: service(),

  init() {
    this._super(...arguments);
  },

  actions: {
    updateAction(oldPass, newPass) {

      let accessToken = this.appConfiguration.getAccessToken();

      let parsedToken = this.tokenParse(accessToken);
      console.log('parsedToken--parsedToken', parsedToken);
      let userName = parsedToken.user_name;

      let context = this;


      let userData = {
        data: {
          id: "1",
          type: "users",
          attributes: {
            username: userName,
            oldPassword: oldPass,
            newPassword: newPass
          },
        }
      };

      let responseAfterUpdatePassword = this.appAuthEngineCredential.updatePassword(userData, accessToken);
      responseAfterUpdatePassword.then(function (result) {

      }).catch(function (msg) {
        console.log('message--msg', msg);
        if (msg.status === 200) {
          context.appConfiguration.clearAppInformation();
          context.get('notifier').success("Update Successful! Login with new Password");
          context.get('router').transitionTo('login');
        }

        if (msg.status === 400) {
          context.set('errorMsg', 'Invalid Old Password');
          context.get('notifier').danger('Invalid Old Password');
        }
        if(msg.responseJSON.message) {
          context.get('notifier').danger(msg.responseJSON.message);
          context.set('errorMsg', msg.responseJSON.message);
        }
      });
    }
  },

  tokenParse: function (token) {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let data = JSON.parse(atob(base64));
    return data;
  }

});
