import Component from '@ember/component';
import {inject as service} from '@ember/service';
import config from 'frontend-engine/config/environment';
import $ from "jquery";

export default Component.extend({

  authEngineHost: config.NGES_SERVICE_HOSTS.AUTH_SERVICE_HOST,
  frontendEngineUIHost: config.NGES_UI_HOSTS.FRONTEND_ENGINE_UI_HOST,
  authEngineUIHost: config.NGES_UI_HOSTS.AUTH_ENGINE_UI_HOST,

  appAuthEngine: service('nges-engines/auth-engine/app-auth-engine'),
  appConfiguration: service('app-configuration'),
  appAuthEngineCredential: service('nges-engines/auth-engine/app-auth-engine-credential'),

  router: service(),
  notifier: service(),
  name: '',
  description: '',
  roles: '',
  email: '',

  init() {
    this._super(...arguments);


    this.loadUserData();
    this.loadRoleList();
  },

  didReceiveAttrs() {
    this._super(...arguments);
    this.set('tmpUserList', this.get('userList'));
  },


  loadUserData() {
    let context = this;
    let accessToken = this.appConfiguration.getAccessToken();
    let allCreatedUsers= this.appAuthEngine.getAllCreatedUsers(accessToken);

    allCreatedUsers.then(function (user) {
      context.set('userList', user.data);
      context.didReceiveAttrs();
    }).catch(function (errorMsg) {
      context.get('notifier').danger('Failed To Load User List');
    });
  },

  loadRoleList() {
    let context = this;

    let accessToken = this.appConfiguration.getAccessToken();

    let allCreatedRoles = this.appAuthEngine.getAllCreatedRoles(accessToken);

    allCreatedRoles.then(function (role) {
      context.set('roleList', role.data);
    }).catch(function (errorMsg) {
      context.get('notifier').danger('Failed To Load Roles');
    });
  },


  actions: {
    getFilterKey(searchKeyword) {
      let tmpUserList = this.get('tmpUserList');
      let userList = tmpUserList;
      let userListRes = userList.filter(function (el) {
        return (el.attributes.name.includes(searchKeyword));
      });

      if (searchKeyword.trim() === '') {
        this.set('userList', tmpUserList);
      } else {
        this.set('userList', userListRes);
      }
    },

    save() {

      let name = this.get('name');
      let uniqueName = this.get('uniqueName');
      let email = this.get('email');

      let enabled = document.getElementById("isEnabled").checked;
      let accLocked = document.getElementById("accLocked").checked;
      let accExpired = document.getElementById("accExpired").checked;
      let credentialExpired = document.getElementById("credentialExpired").checked;


      let text = $('#userRole option:selected').toArray().map(item => item.value + ':' + item.text).join();
      let roleData = [];

      let tmp = text.split(',');

      for (let i = 0; i < tmp.length; i++) {
        let r_data = tmp[i].split(':');
        let p = {
          id: r_data[0],
          name: r_data[1],
        };
        roleData.push(p);
      }

      let flag = true;

      for (let i = 0; i < roleData.length; i++) {
        console.log('roleData[i].attributes', roleData[i].id);
        if (roleData[i].id === "1") {
          flag = false;
          break;
        }
      }

      if (flag) {
        let p = {
          id: 1,
          name: "role_user",
        };
        roleData.push(p);
      }

      let timestamp = Math.floor(Date.now() / 1000);

      let userData = {
        data: {
          id: timestamp,
          type: "users",
          attributes: {
            email: email,
            username: uniqueName,
            name: name,
            enabled: enabled,
            accountNonLocked: accLocked,
            accountNonExpired: accExpired,
            credentialsNonExpired: credentialExpired,
            roles: roleData
          }
        }
      };
      console.log('message-userData', (userData));

      let context = this;
      let accessToken = this.appConfiguration.getAccessToken();
      let responseAfterAddingUser = this.appAuthEngine.addNewUser(userData,accessToken);
      responseAfterAddingUser.then(function (msg) {
        context.get('userList').pushObject(userData);
        context.get('notifier').success('New User Created');
      }).catch(function (msg) {
        context.get('notifier').danger('Failed! To Create New User');
      });
    }
  }
});
