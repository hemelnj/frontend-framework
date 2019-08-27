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
    this.set('userId', userId);
    let context = this;

    let accessToken = this.appConfiguration.getAccessToken();


    let allRolesOfThisUser = this.appAuthEngine.getRoleByUserId(userId, accessToken);

    allRolesOfThisUser.then(function (role) {
      context.set('roleList', role.data);
      context.appConfiguration.setUserRoles(role.data);
    });


    let entityListByUser = this.appAuthEngine.getEntityByUserId(userId, accessToken);

    entityListByUser.then(function (entity) {
      console.log('message--entity', entity.data);
      context.set('orgList', entity.data);
    });

  },

  loadApplication(entityId) {
    let context = this;
    let accessToken = this.appConfiguration.getAccessToken();
    let userId = this.get('userId');
    let allCreatedUsers = this.appAuthEngine.getApplicationByUserIdAndEntityId(entityId, userId, accessToken);

    allCreatedUsers.then(function (application) {
      console.log('message--application', application.data);
      context.set('appList', application.data);
    });
  },

  loadMenu() {
    let appCode = this.get('appCode');
    let entityCode = this.get('entityCode');

    this.appConfiguration.setOrganizationCode(entityCode);
    this.appConfiguration.setApplicationCode(appCode);

    let userId = this.get('userId');

    let accessToken = this.appConfiguration.getAccessToken();

    let roleList = this.get('roleList');
    let roles = [];
    roleList.forEach(function (v, k) {
      roles.push(v.id);
    });
    console.log('roles', roles);
    let context = this;
    // load menu tree data
    context.appWelcome.getInitialMenuTreeInformation(roles, appCode, entityCode, accessToken).then(function (result) {

      context.appConfiguration.setMenuTreeInformation(result.data);
      if (result.data === undefined) {
        context.get('warning').success('Menu Tree Should not be empty!');
      }
      //context.get('notifier').success('Login Successful!');
      context.get("router").transitionTo("welcome");


    }).catch(function (msg) {
      context.get('notifier').danger('Failed! Fetch Menus Information');
      context.get("router").transitionTo("welcome");
      //window.location.replace(context.frontendEngineUIHost + "/welcome");
    });
  },

  actions: {

    onChangeOrganization(entityData) {

      this.set('entityCode',entityData.attributes.code);
      this.set('entityId', entityData.id);
      this.loadApplication(entityData.id);
    },

    onChangeApplication(appData) {

      this.set('appCode',appData.attributes.code);
      this.set('applicationId', appData.id);
      this.loadMenu();
    },
  }


});
