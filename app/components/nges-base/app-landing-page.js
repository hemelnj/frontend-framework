import Component from '@ember/component';
import config from 'frontend-engine/config/environment';
import {inject as service} from '@ember/service';

export default Component.extend({

  router: service(),
  notifier: service(),

  authEngineHost: config.NGES_SERVICE_HOSTS.AUTH_SERVICE_HOST,
  frontendEngineUIHost: config.NGES_UI_HOSTS.FRONTEND_ENGINE_UI_HOST,

  appWelcome: service('nges-core/app-welcome'),
  appAuthEngine: service('nges-engines/auth-engine/app-auth-engine'),
  appConfiguration: service('app-configuration'),
  appAuthEngineCredential: service('nges-engines/auth-engine/app-auth-engine-credential'),

  init() {
    this._super(...arguments);
    let userId = this.appConfiguration.getUserId();


    let context = this;

    let accessToken = this.appConfiguration.getAccessToken();


    let allRolesOfThisUser = this.appAuthEngine.getRoleByUserId(userId, accessToken);
    allRolesOfThisUser.then(function (role) {
      context.set('roleList', role.data);
      context.appConfiguration.setUserRoles(role.data);
    });


    let orgListByUser = this.appAuthEngine.getOrganizationByUserId(userId, accessToken);
    orgListByUser.then(function (org) {
      console.log('message--entity', org.data);
      context.set('orgList', org.data);
    });

  },

  loadApplication(orgId) {
    let context = this;
    let accessToken = this.appConfiguration.getAccessToken();
    let userId = this.appConfiguration.getUserId();
    let allCreatedUsers = this.appAuthEngine.getApplicationByUserIdAndEntityId(orgId, userId, accessToken);

    allCreatedUsers.then(function (application) {
      console.log('message--application', application.data);
      context.set('appList', application.data);
    });
  },

  loadMenu() {
    let app = this.appConfiguration.getApplicationCode();
    let org = this.appConfiguration.getOrganizationCode();


    let accessToken = this.appConfiguration.getAccessToken();

    let roleList = this.get('roleList');
    let roles = [];
    roleList.forEach(function (v, k) {
      roles.push(v.id);
    });
    console.log('roles', roles);
    let context = this;
    // load menu tree data
    context.appWelcome.getInitialMenuTreeInformation(roles, app, org, accessToken).then(function (result) {

      context.appConfiguration.setMenuTreeInformation(result.data);
      if (result.data === undefined) {
        context.get('warning').success('Menu Tree Should not be empty!');
      }
      context.get("router").transitionTo("welcome");


    }).catch(function (msg) {
      context.get('notifier').danger('Failed! Fetch Menus Information');
      //context.get("router").transitionTo("welcome");
      //window.location.replace(context.frontendEngineUIHost + "/welcome");
    });
  },

  actions: {

    onChangeOrganization(orgData) {
      this.appConfiguration.setOrganizationCode(orgData.attributes.code);
      console.log('entityCode', orgData.attributes.code);
      this.set('entityId', orgData.id);
      this.loadApplication(orgData.id);
    },

    onChangeApplication(appData) {
      console.log('appCode', appData.attributes.code);
      this.appConfiguration.setApplicationCode(appData.attributes.code);
      this.set('applicationId', appData.id);
      this.loadMenu();
    },
  }


});
