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
  routePath: "welcome.application-loader.panel-loader.module-loader.service-holder-loader.menu-template-loader.submenu-template-loader",

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
    let crudActionsView = [];

    if(templateInformation.detailView !== undefined) {
      for (let detailPage of templateInformation.detailView) {

        crudActionsView.pushObject({
          code: detailPage.code,
          label: detailPage.label,
          shortLabel: detailPage.shortLabel,
          icon: detailPage.icon,
          isVisibleInLanding: detailPage.isVisibleInLanding,
          name: detailPage.name,
          routePath: this.routePath,
        })
      }
    }

    this.set('templateInformation', templateInformation);
    this.set('crudActionsView', crudActionsView);
  },

  actions: {

    perforMenuAction(code) {

      this.get("router").transitionTo(this.routePath);
    },
    performAction(code){
      this.get("router").transitionTo(this.routePath + '.submenu-detail-template-loader', code);
    },
  }

})
