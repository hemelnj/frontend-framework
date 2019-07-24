import Controller from '@ember/controller';
import {inject as service} from '@ember/service';
import Authorization from '../../../mixins/authorization'
import config from '../../../config/environment';

export default Controller.extend(Authorization, {

  appName: config.APP.appName,
  isSidebarHidden: false,
  appAuth: service('app-configuration'),
  appRestTemplate: service('app-rest-template'),
  appWelcome: service('nges-core/app-welcome'),
  appLogin: service('nges-core/app-login'),
  actions: {
    toggleNavSidebarAction() {
      this.toggleProperty('isSidebarHidden');
    },

    signOut() {
      this.clearAuthorization()
    },

    logoutAll(){
      this.appLogin.singleLogout();
    },

    navigateToUpdatePassword(){
      this.get('router').transitionTo('update-password');
      console.log('message-panel loader', 'navigateToUpdatePassword');
      //this.clearAuthorization();
      //window.location.replace(this.authEngineUIHost + "/update-user-credential");
    }
  },

  init() {
    this._super(...arguments);
  }


});
