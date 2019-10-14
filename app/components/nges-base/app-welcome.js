import Component from '@ember/component';
import {inject as service} from '@ember/service';
import Authorization from '../../mixins/authorization'
import config from 'frontend-engine/config/environment';
import RSVP from 'rsvp';

export default Component.extend(Authorization, {

  appName: config.APP.appName,
  appLogo: config.APP.appLogo,
  intl: service(),
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
    changeLocaleENG(value) {
      console.log('message-changeLocaleENG-welcome', value);
      this.appConfiguration.setAppLanguage(['en-us']);
      this.get('intl').setLocale(['en-us']);
    },
    changeLocaleBNG(value) {
      console.log('message-changeLocaleBNG-welcome', value);
      this.appConfiguration.setAppLanguage(['bn-ln']);
      this.get('intl').setLocale(['bn-ln']);
    },
    navigateToUpdatePassword() {
      console.log('message-app welcome', 'navigateToUpdatePassword');
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

    let org = this.appConfiguration.getOrganizationCode();
    let app = this.appConfiguration.getApplicationCode();

    let accessToken = this.appConfiguration.getAccessToken();

    context.set('userEmail', userEmail);
    context.appWelcome.getInitialMenuTreeInformation(roles, app, org, accessToken).then(function (results) {

      let menuTreeData = results.data.children;
      let orgMenuTreeData = [];
      let appMenuTreeData = [];

      for (let i = 0; i < menuTreeData.length; i++) {
        orgMenuTreeData = menuTreeData[i].children;
        for (let j = 0; j < orgMenuTreeData.length; j++) {
          if (orgMenuTreeData[j].code === org) {
            appMenuTreeData = orgMenuTreeData[j].children;
            break;
          }
        }
      }

      for (let i = 0; i < appMenuTreeData.length; i++) {
        if (appMenuTreeData[i].code === app) {
          appMenuTreeData = orgMenuTreeData[i].children;
          break;
        }
      }


      let entityCode = menuTreeData[0].code;
      context.appConfiguration.setEntityCode(entityCode);

      // store menuTree
      context.appConfiguration.setMenuTreeInformation(appMenuTreeData);


      authorizationStatus = true;

      //context.set('serviceList', duplicateRemoveFun(context.appWelcome.getAllApplicationPanelList()));
      context.set('serviceList', context.appWelcome.getAllApplicationPanelList());

    }).then(function (data) {

      context.set('serviceList', context.appWelcome.getAllApplicationPanelList());
      //context.set('serviceList', duplicateRemoveFun(context.appWelcome.getAllApplicationPanelList()));
    });

    if (authorizationStatus) {
      context.get('notifier').success('To Access Resources Need Authorization');
    }

  }

});

//todo need to remove after demo :)
let duplicateRemoveFun = (params) => {
  const names = params;
  let count = 0;
  let newArray = [];

  for (let n of names) {
    if (n.displayName === 'Operation panel') {
      count++;
      if (count > 1) {
        break;
      }
      //newArray.push(n);
      console.log('message--newArray', newArray);
    }
    newArray.push(n);
  }
  return newArray;
};
