import Route from '@ember/routing/route';
import {inject as service} from '@ember/service';

export default Route.extend({

  appWelcome: service('nges-core/app-welcome'),
  appTemplateSetup: service('app-template-setup'),
  model(service_menu, transition) {

    let routeInfos = transition.routeInfos;
    //console.log('routeInfos', routeInfos);


    let appCode = transition.routeInfos[2].params['application_code'];
    let appPanelCode = transition.routeInfos[3].params['panel_code'];
    let appModuleCode = transition.routeInfos[4].params['module_code'];
    let appServiceHolderCode = transition.routeInfos[5].params['service_holder_code'];
    let appMenuTemplateCode = transition.routeInfos[6].params['menu_template_code'];          //
    let appSubmenuTemplateCode = transition.routeInfos[7].params['submenu_template_code'];
    let appTemplateDetailCode = transition.routeInfos[8].params['submenu_detail_template_code'];   // 4 level for template_detail_view_code


    // console.log('appCode', appCode);                                    // app->rms
    // console.log('appPanelCode', appPanelCode);                          // panel->operation
    // console.log('appModuleCode', appModuleCode);                        // module->collection
    // console.log('appServiceHolderCode', appServiceHolderCode);          // FUNCTION - MICROSERVICE
    // console.log('appMenuTemplateCode', appMenuTemplateCode);            // menu(service)->remitters
    // console.log('appSubmenuTemplateCode', appSubmenuTemplateCode);      // submenu(function)->remitter-reg
    // console.log('appTemplateDetailCode', appTemplateDetailCode);        // remitter(sub-function)-reg->details-view-page


    // store route meta information into ember data for future
    this.appWelcome.setApplicationRouteInformation(
      appCode,
      appPanelCode,
      appModuleCode,
      appServiceHolderCode,
      appMenuTemplateCode,
      appSubmenuTemplateCode
    );


    this.store.createRecord('nges-core/engine-route-information', {
      id: 2,
      appCode: appCode,
      appPanelCode: appPanelCode,
      appModuleCode: appModuleCode,
      appServiceHolderCode: appServiceHolderCode,
      appMenuTemplateCode: appMenuTemplateCode,
      appSubmenuTemplateCode: appSubmenuTemplateCode,
      appTemplateDetailCode: appTemplateDetailCode,
    });


    let templateInformation = this.appTemplateSetup.getSingleDetailViewTemplateName(
      appCode,
      appPanelCode,
      appModuleCode,

      appMenuTemplateCode,
      appSubmenuTemplateCode,
      appTemplateDetailCode
    );


    let completeTemplateName = templateInformation.completeTemplateName;

    return {
      appCode: appCode,
      appPanelCode: appPanelCode,
      appModuleCode: appModuleCode,
      appServiceHolderCode: appServiceHolderCode,
      appMenuTemplateCode: appMenuTemplateCode,
      appSubmenuTemplateCode: appSubmenuTemplateCode,

      appTemplateDetailCode: appTemplateDetailCode,
      templateInformation: templateInformation,
      completeTemplateName: completeTemplateName
    }

  }

});
