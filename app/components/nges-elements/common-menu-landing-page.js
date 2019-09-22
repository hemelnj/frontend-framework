import Component from '@ember/component';
import {inject as service} from '@ember/service';

let DEFAULT_SELECTED_TAB_CODE = 'allStates';


export default Component.extend({


  appTemplateSetup: service('app-template-setup'),
  appWelcome: service('nges-core/app-welcome'),
  store: service(),
  appConfiguration: service('app-configuration'),
  ngesTabTableService: service('nges-elements/nges-tab-table'),
  serviceInitializer: service('nges-services/service-initializer'),
  notifier: service(),
  router: service(),
  routePath:"welcome.application-loader.panel-loader.module-loader.service-holder-loader.menu-template-loader.submenu-template-loader",

  init() {
    this._super(...arguments);

  },

  didReceiveAttrs() {
    this._super(...arguments);


    let routeInfo = this.get('routeInformation');

    let templateInformation = this.appTemplateSetup.getSingleTemplateName(
      routeInfo.appCode,
      routeInfo.appPanelCode,
      routeInfo.appModuleCode,
      routeInfo.appMenuTemplateCode,
      routeInfo.appSubmenuTemplateCode
    );

    console.log('message-----555555');
    console.log('message-----555555', templateInformation);

    this.set('detailView', templateInformation.detailView);

  },

  actions:{
    newView(){
      let context = this;
      context.get("router").transitionTo(this.routePath);
    },

    searchView(){

      let detailView = this.get('detailView');
      let searchView = detailView[1].code;
      this.get("router").transitionTo(this.routePath+'.submenu-detail-template-loader',searchView);
    },

    gridView(){
      let detailView = this.get('detailView');

      let gridView = detailView[0].code;
      this.get("router").transitionTo(this.routePath+'.submenu-detail-template-loader',gridView);
    },
  }

})
