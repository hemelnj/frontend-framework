import Route from '@ember/routing/route';
import {inject as service} from '@ember/service';



export default Route.extend({


  appWelcome: service('nges-core/app-welcome'),
  appConfiguration: service('app-configuration'),
  model(service_data, transition) {



    let routeInfos = transition.routeInfos;
    //console.log('routeInfos', routeInfos);


    let appCode = transition.routeInfos[2].params['application_code'];
    let appPanelCode = transition.routeInfos[3].params['panel_code'];


    //console.log('appCode', appCode);                                    // app->rms
    //console.log('appPanelCode', appPanelCode);                          // panel->operation

    let serviceList = this.appWelcome.getAllApplicationPanelList();
    let moduleList = this.appWelcome.getMenuListByPanelCode(appPanelCode);

    let hasSuperAdmin = this.appConfiguration.hasThisRoleByName("role_super_admin");





    let appPanelInformation ={
      appCode: appCode,
      appPanelCode: appPanelCode,
    };


    return {
      serviceList: serviceList,
      moduleList: moduleList,
      hasSuperAdmin: hasSuperAdmin,
      appPanelInformation: appPanelInformation,
    }

  }


});
