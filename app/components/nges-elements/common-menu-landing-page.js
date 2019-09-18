import Component from '@ember/component';
import {inject as service} from '@ember/service';

let DEFAULT_SELECTED_TAB_CODE = 'allStates';


export default Component.extend({

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

    let routeInfo = this.get('routeInformation');
    console.log('messager-----------outeInformationrouteInformation', routeInfo);
  },

  actions:{
    newView(){
      let context = this;
      context.get("router").transitionTo(this.routePath);
    },

    searchView(){

    },

    gridView(){
      console.log('message-gridView-click');
      let routeInfo = this.get('routeInformation');
      let gridView = routeInfo.templateInformation.detailView[0].code;
      let context = this;
      context.get("router").transitionTo(this.routePath+'.submenu-detail-template-loader',gridView);
    },
  }

})
