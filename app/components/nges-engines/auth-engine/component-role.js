import Component from '@ember/component';
import config from 'frontend-engine/config/environment';
import {inject as service} from '@ember/service';
import $ from "jquery";

export default Component.extend({

  authEngineHost: config.NGES_SERVICE_HOSTS.AUTH_SERVICE_HOST,
  frontendEngineUIHost: config.NGES_UI_HOSTS.FRONTEND_ENGINE_UI_HOST,

  appAuthEngine: service('nges-engines/auth-engine/app-auth-engine'),
  appConfiguration: service('app-configuration'),
  appAuthEngineCredential: service('nges-engines/auth-engine/app-auth-engine-credential'),
  notifier: service(),

  name: '',
  code: '',
  description: '',
  data: '',
  router: service(),

  init() {
    this._super(...arguments);
    this.loadEntity();
    this.loadRoleList();
  },

  didReceiveAttrs() {
    this._super(...arguments);
    this.set('tmpRoleList', this.get('roleList'));
  },

  loadEntity() {

    let context = this;
    let root = 2;
    let accessToken = this.appConfiguration.getAccessToken();
    let allCreatedUsers = this.appAuthEngine.getAllEntity(root, accessToken);

    allCreatedUsers.then(function (entity) {
      context.set('entityList', entity.data.attributes.children);
    });

  },

  loadApplication(entityId) {
    let context = this;
    let accessToken = this.appConfiguration.getAccessToken();
    let allCreatedUsers = this.appAuthEngine.getAllApplication(entityId, accessToken);

    allCreatedUsers.then(function (application) {
      context.set('appList', application.data);
    });
  },

  makePrefix(orgName) {
    let name = orgName.toLowerCase().replace(/ /g, '');
    this.set('name', name + '_');
  },

  loadRoleList() {
    let context = this;

    let accessToken = this.appConfiguration.getAccessToken();

    let allCreatedRoles = this.appAuthEngine.getAllRoles(accessToken);

    allCreatedRoles.then(function (role) {
      context.set('roleList', role.data);
      context.didReceiveAttrs();
    }).catch(function (errorMsg) {
      context.get('notifier').danger('Failed To Load Roles');
    });
  },

  actions: {
    getFilterKey(searchKeyword) {
      let tmpRoleList = this.get('tmpRoleList');
      let roleList = tmpRoleList;
      let roleListRes = roleList.filter(function (el) {
        return (el.attributes.name.includes(searchKeyword));
      });

      if (searchKeyword.trim() === '') {
        this.set('roleList', tmpRoleList);
      } else {
        this.set('roleList', roleListRes);
      }
    },

    onChangeOrganization(value) {
      let orgData = JSON.parse(value);
      this.makePrefix(orgData.name);
      this.set('orgDataId', orgData.id);
      this.loadApplication(orgData.id);
    },

    onChangeApplication(application) {
      let appData = JSON.parse(application);
      this.set('applicationId', appData.id);
    },

    save() {

      let name = this.get('name');
      let code = document.getElementById("roleCode").value;
      let description = this.get('description');


      let timestamp = Math.floor(Date.now() / 1000);
      let roleData = {
        data: {
          id: timestamp,
          type: 'roles',
          attributes: {
            name: name,
            application: {
              id: this.get('applicationId'),
            }
          }
        }
      };

      let context = this;

      let accessToken = this.appConfiguration.getAccessToken();
      let responseAfterAddingRole = this.appAuthEngine.addNewRole(roleData, accessToken);
      responseAfterAddingRole.then(function (msg) {
      }).then(function (response) {
        console.log('message-role-response', response.status);
        context.get('notifier').success('Role Created Successfully');
      });
    },

    editActionEvent() {
      let context = this;
      context.get('notifier').success('Working on Edit');
    },

    updatePassword() {
      let context = this;
      let accessToken = this.appConfiguration.getAccessToken();
      window.location.replace(context.authEngineUIHost + "/update-user-credential?access_token=" + accessToken);
    }
  }


});
