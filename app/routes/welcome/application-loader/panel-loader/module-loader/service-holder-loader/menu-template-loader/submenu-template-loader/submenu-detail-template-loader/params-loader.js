import Route from '@ember/routing/route';
import {inject as service} from '@ember/service';

export default Route.extend({


  appTemplateSetup: service('app-template-setup'),
  appWelcome: service('nges-core/app-welcome'),
  model(submenu_route, transition) {
    // console.log('route-name', 'item-template-loader.item-sub-item-loader.js');

    let routeInfos = transition.routeInfos;
    console.log('routeInfos-param', routeInfos);


    let appCode = transition.routeInfos[2].params['application_code'];
    let appPanelCode = transition.routeInfos[3].params['panel_code'];
    let appModuleCode = transition.routeInfos[4].params['module_code'];
    let appServiceHolderCode = transition.routeInfos[5].params['service_holder_code'];
    let appMenuTemplateCode = transition.routeInfos[6].params['menu_template_code'];          //
    let appSubmenuTemplateCode = transition.routeInfos[7].params['submenu_template_code'];
    let appTemplateDetailCode = transition.routeInfos[8].params['submenu_detail_template_code'];
    let appParamsCode = transition.routeInfos[9].params['params_code'];



    //---- initially process route information from menu tree for easy future access
    // So it can initialize route information, it required* for dynamic url or other things.
    this.appWelcome.setApplicationRouteInformation(
      appCode,
      appPanelCode,
      appModuleCode,
      appServiceHolderCode,
      appMenuTemplateCode,
      appSubmenuTemplateCode
    );
    //-------------------------------------

    let templateInformation = this.appTemplateSetup.getSingleTemplateName(
      appCode,
      appPanelCode,
      appModuleCode,
      appMenuTemplateCode,
      appSubmenuTemplateCode
    );
    let completeTemplateName = templateInformation.completeTemplateName;

    return {
      appCode: appCode,
      appPanelCode: appPanelCode,
      appServiceHolderCode: appServiceHolderCode,
      appModuleCode: appModuleCode,
      appMenuTemplateCode: appMenuTemplateCode,

      appSubmenuTemplateCode: appSubmenuTemplateCode,
      templateInformation: templateInformation,
      completeTemplateName: completeTemplateName,
    }

  }

});
