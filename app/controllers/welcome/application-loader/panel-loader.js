import Controller from '@ember/controller';
import {inject as service} from '@ember/service';
import Authorization from '../../../mixins/authorization'
import config from '../../../config/environment';

export default Controller.extend(Authorization, {

  appName: config.APP.appName,
  isSidebarHidden: true,
  appAuth: service('app-configuration'),
  appRestTemplate: service('app-rest-template'),
  appWelcome: service('nges-core/app-welcome'),
  appLogin: service('nges-core/app-login'),
  authEngineUIHost: config.NGES_UI_HOSTS.AUTH_ENGINE_UI_HOST,
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
      this.clearAuthorization();
      window.location.replace(this.authEngineUIHost + "/update-user-credential");
    }
  },

  init() {
    this._super(...arguments);
  }


});
