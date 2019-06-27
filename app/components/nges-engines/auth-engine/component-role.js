import Component from '@ember/component';
import config from 'frontend-engine/config/environment';
import {inject as service} from '@ember/service';
import $ from "jquery";

export default Component.extend({

  authEngineHost: config.NGES_SERVICE_HOSTS.AUTH_SERVICE_HOST,
  frontendEngineUIHost: config.NGES_UI_HOSTS.FRONTEND_ENGINE_UI_HOST,
  authEngineUIHost: config.NGES_UI_HOSTS.AUTH_ENGINE_UI_HOST,

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
    this.loadRoleList();
  },

  didReceiveAttrs() {
    this._super(...arguments);
    this.set('tmpRoleList', this.get('roleList'));
  },

  loadRoleList() {
    let context = this;

    let accessToken = this.appConfiguration.getAccessToken();

    let allCreatedRoles = this.appAuthEngine.getAllCreatedRoles(accessToken);

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
            name: name
          }
        }
      };
      let context = this;

      let accessToken = this.appConfiguration.getAccessToken();
      let responseAfterAddingRole = this.appAuthEngine.addNewRole(roleData,accessToken);
      responseAfterAddingRole.then(function (msg) {
      }).then(function (response) {
        console.log('message-role-response',response.status);
        context.get('notifier').success('Role Created Successfully');
      })
    },

    editActionEvent() {
      let context = this;
      context.get('notifier').success('Working on Edit');
    },

    updatePassword() {
      let context = this;
      let accessToken = this.appConfiguration.getAccessToken();
      window.location.replace(context.authEngineUIHost+"/update-user-credential?access_token="+accessToken);
    }
  }


});
