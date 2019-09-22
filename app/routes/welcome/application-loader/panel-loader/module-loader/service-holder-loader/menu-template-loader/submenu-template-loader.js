import Route from '@ember/routing/route';

import {inject as service} from '@ember/service';

export default Route.extend({


  appTemplateSetup: service('app-template-setup'),
  model(service_menu, transition) {


    let appCode = transition.routeInfos[2].params['application_code'];
    let appPanelCode = transition.routeInfos[3].params['panel_code'];
    let appModuleCode = transition.routeInfos[4].params['module_code'];
    let appServiceHolderCode = transition.routeInfos[5].params['service_holder_code'];
    let appMenuTemplateCode = transition.routeInfos[6].params['menu_template_code'];
    let appSubmenuTemplateCode = transition.routeInfos[7].params['submenu_template_code'];



    return {
      appCode: appCode,
      appPanelCode: appPanelCode,
      appModuleCode: appModuleCode,
      appServiceHolderCode: appServiceHolderCode,
      appMenuTemplateCode: appMenuTemplateCode,
      appSubmenuTemplateCode: appSubmenuTemplateCode,
    };
  }



});
