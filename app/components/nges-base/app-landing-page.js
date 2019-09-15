import Component from '@ember/component';
import config from 'frontend-engine/config/environment';
import {inject as service} from '@ember/service';

export default Component.extend({

  appLogo: config.APP.appLogo,
  router: service(),
  notifier: service(),

  authEngineHost: config.NGES_SERVICE_HOSTS.AUTH_SERVICE_HOST,
  frontendEngineUIHost: config.NGES_UI_HOSTS.FRONTEND_ENGINE_UI_HOST,

  appWelcome: service('nges-core/app-welcome'),
  appAuthEngine: service('nges-engines/auth-engine/app-auth-engine'),
  appConfiguration: service('app-configuration'),
  appAuthEngineCredential: service('nges-engines/auth-engine/app-auth-engine-credential'),

  model(service_data, transition) {

    return {
      appLogo: this.appLogo
    }
  },

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
      context.set('orgList', org.data);
    });

  },

  loadApplication(orgId) {
    let context = this;
    let accessToken = this.appConfiguration.getAccessToken();
    let userId = this.appConfiguration.getUserId();
    let allCreatedUsers = this.appAuthEngine.getApplicationByUserIdAndOrgId(orgId, userId, accessToken);

    allCreatedUsers.then(function (application) {
      context.set('appList', application.data);
    });
  },

  loadMenu() {
    let org = this.appConfiguration.getOrganizationCode();
    let app = this.appConfiguration.getApplicationCode();

    let accessToken = this.appConfiguration.getAccessToken();

    let roleList = this.appConfiguration.getUserRoles();

    let roles = [];
    roleList.forEach(function (v, k) {
      if(v.id !== 3){
        roles.push(v.id);
      }

    });

    let context = this;

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
      this.appConfiguration.setOrganizationId(orgData.id);
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
