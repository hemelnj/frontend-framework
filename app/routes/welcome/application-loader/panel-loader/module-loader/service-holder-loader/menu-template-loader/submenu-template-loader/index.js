import Route from '@ember/routing/route';
import {inject as service} from '@ember/service';

export default Route.extend({


  appTemplateSetup: service('app-template-setup'),
  appWelcome: service('nges-core/app-welcome'),
  model(submenu_route, transition) {
    // console.log('route-name', 'item-template-loader.item-sub-item-loader.js');

    let routeInfos = transition.routeInfos;
    //console.log('routeInfos', routeInfos);


    let appCode = transition.routeInfos[2].params['application_code'];
    let appPanelCode = transition.routeInfos[3].params['panel_code'];
    let appModuleCode = transition.routeInfos[4].params['module_code'];
    let appServiceHolderCode = transition.routeInfos[5].params['service_holder_code'];
    let appMenuTemplateCode = transition.routeInfos[6].params['menu_template_code'];          //
    let appSubmenuTemplateCode = transition.routeInfos[7].params['submenu_template_code'];


    // console.log('appCode', appCode);                                    // app->rms
    // console.log('appPanelCode', appPanelCode);                          // panel->operation
    // console.log('appModuleCode', appModuleCode);                        // module->collection
    // console.log('appServiceHolderCode', appServiceHolderCode);          // FUNCTION - MICROSERVICE
    // console.log('appMenuTemplateCode', appMenuTemplateCode);            // menu(service)->remitters
    // console.log('appSubmenuTemplateCode', appSubmenuTemplateCode);      // submenu(function)->remitter-reg



    // 1 fix cause it always insert one record
    this.store.unloadAll('nges-core/engine-route-information');
    this.store.createRecord('nges-core/engine-route-information', {
      id: 1,
      appCode: appCode,
      appPanelCode: appPanelCode,
      appModuleCode: appModuleCode,
      appServiceHolderCode: appServiceHolderCode,
      appMenuTemplateCode: appMenuTemplateCode,
      appSubmenuTemplateCode: appSubmenuTemplateCode,
    });


    let templateInformation = this.appTemplateSetup.getSingleTemplateName(
      appCode,
      appPanelCode,
      appModuleCode,
      appMenuTemplateCode,
      appSubmenuTemplateCode
    );


    // store route meta information into ember data for future
    this.appWelcome.setApplicationRouteInformation(
      appCode,
      appPanelCode,
      appModuleCode,
      appServiceHolderCode,
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
