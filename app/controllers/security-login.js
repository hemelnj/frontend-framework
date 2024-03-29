import Controller from '@ember/controller';
import {inject as service} from '@ember/service';
import Authorization from '../mixins/authorization'
import config from 'frontend-engine/config/environment'

export default Controller.extend(Authorization, {

  authEngineHost: config.NGES_SERVICE_HOSTS.AUTH_SERVICE_HOST,
  authEngineUIHost: config.NGES_UI_HOSTS.AUTH_ENGINE_UI_HOST,
  appConfiguration: service('app-configuration'),
  appLogin: service('nges-core/app-login'),
  appWelcome: service('nges-core/app-welcome'),
  notifier: service(),
  init() {
    this._super(...arguments);

    this.set('userInformation', {
      name: 'admin',
      password: 'password'
    })
  },
  actions: {
    signin(userInformation) {
      let makeLogin = this.appLogin.makeLogin(userInformation);

      let context = this;
      makeLogin.then(function (result) {

        if (result !== null) {

          context.appConfiguration.setAuthorizedUserToken(result);
          let roleList = context.appConfiguration.getUserRoleIdList();
          let accessToken = result['access_token'];

          context.appWelcome.getInitialMenuTreeInformation(roleList, accessToken).then(function (result) {

            context.appConfiguration.setMenuTreeInformation(result.data);
            if (result.data === null) {
              context.get('warning').success('Menu Tree Should not be empty');
            }
            context.get('notifier').success('Successfully Login User');
            context.transitionToRoute("welcome");
          }).catch(function (msg) {
            context.get('notifier').danger('Failed! To Fetch Menu Tree Data');
            context.transitionToRoute("welcome");
          });

          //context.transitionTo("welcome");
        } else {
          context.get('notifier').danger('Failed! To Login Invalid Credential');
        }
      });


      // this.get('notifier').primary('Primary notification');
      // this.get('notifier').info('Information notification');
      // this.get('notifier').warning('Warning notification');
      // this.get('notifier').danger('Danger notification');
      // this.get('notifier').secondary('Secondary notification');

    },

    adminLogin(userInformation) {

      let context = this;
      this.appLogin.makeAdminLogin(userInformation).then(function (result) {
        console.log('message-userInformation', result);
        let flag=false;
        let roles=result.roles;
        console.log('message-userInformation', roles);
        for(let i=0;i<roles.length;i++){
          if(roles[i].name==="role_super_admin") {
            flag = true;
            break;
          }
        }
        if (flag) {
          let access_token = result['access_token'];
          context.appConfiguration.setAuthorizedUserToken(result);
          // check user is admin or not
          context.appLogin.identifyAdmin(access_token).then(function (users) {
            if (users != null) {
              window.location.replace(context.authEngineUIHost + "/engine-configuration?access_token=" + access_token);
            }
          });

        } else {
          context.get('notifier').danger('Login Failed! Invalid Credential');
        }
      }).catch(function (msg) {
        context.get('notifier').danger('Failed! To Login Invalid Credential');
      });

    }
  },

});
