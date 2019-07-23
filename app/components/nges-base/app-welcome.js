import Component from '@ember/component';
import {inject as service} from '@ember/service';
import Authorization from '../../mixins/authorization'
import config from 'frontend-engine/config/environment';
import RSVP from 'rsvp';

export default Component.extend(Authorization, {

  appName: config.APP.appName,
  appLogo: config.APP.appLogo,
  intl: service(),
  authEngineUIHost: config.NGES_UI_HOSTS.AUTH_ENGINE_UI_HOST,
  appConfiguration: service('app-configuration'),
  appRestTemplate: service('app-rest-template'),
  appWelcome: service('nges-core/app-welcome'),
  notifier: service(),
  router: service(),
  actions: {
    signOut() {
      this.appConfiguration.logoutUser();
      this.clearAuthorization();
    },
    changeLocaleENG(){
      this.get('intl').setLocale(['en-us']);
    },
    changeLocaleBNG(){
      this.get('intl').setLocale(['bn-ln']);
    },
    navigateToUpdatePassword(){
      this.get('router').transitionTo('update-password');
    }
  },


  init() {
    this._super(...arguments);

    // initial authorization check otherwise redirect to login
    if (this.appConfiguration.getAuthorizedUserInformation() === null) {
      //this.transitionToRoute("login");
      this.get('router').transitionTo('login');
    } else {
      this.authorizeUserThen();
    }
  },
  authorizeUserThen() {

    let context = this;
    let authorizationStatus = false;
    let roles = this.appConfiguration.getUserRoleIdList();
    let userEmail = this.appConfiguration.getAuthorizedUserInformation().email;
    let accessToken = this.appConfiguration.getAccessToken();

    context.set('userEmail',userEmail);
    context.appWelcome.getInitialMenuTreeInformation(roles, accessToken).then(function (results) {
      let menuTreeData = results.data.children;


      // store menuTree
      context.appConfiguration.setMenuTreeInformation(menuTreeData);


      authorizationStatus = true;

      context.set('serviceList', context.appWelcome.getAllApplicationPanelList());

    }).then(function (data) {

      context.set('serviceList', context.appWelcome.getAllApplicationPanelList());
    });

    if (authorizationStatus) {
      context.get('notifier').success('To Access Resources Need Authorization');
    }

  }

});
