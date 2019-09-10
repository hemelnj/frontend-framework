import Service, {inject as service} from '@ember/service';
import config from 'frontend-engine/config/environment';
import DS from "ember-data";
import {getOwner} from '@ember/application';


let SERVICE_HOLDER = {
  MICROSERVICE: 'MICROSERVICE',
  FUNCTION: 'FUNCTION',
};

let applicationRouteInformation = {
  applicationId: "",
  applicationCode: "",
  panelId: "",
  panelCode: "",
  moduleId: "",
  moduleCode: "",
  serviceHolderId: "",
  serviceHolderCode: "",
  menuId: "",
  menuCode: "",

  subFunctionId: "",
  subFunctionCode: ""
};

let SERVICE_STATES = [];

export default Service.extend({

  intl: service(),
  store: service(),
  appName: config.APP.appName,
  appRestTemplate: service('app-rest-template'),
  appConfiguration: service('app-configuration'),
  authEngineHost: config.NGES_SERVICE_HOSTS.AUTH_SERVICE_HOST,
  treeEngineHost: config.NGES_SERVICE_HOSTS.TREE_SERVICE_HOST,

  init() {
    this._super(...arguments);
  },

  getInitialMenuTreeInformation(roles, appCode, orgCode, accessToken) {

    roles = JSON.stringify(roles);

    let beforeSend = function (xhr) {
      xhr.setRequestHeader('content-type', 'application/json');
      xhr.setRequestHeader('authorization', 'Bearer ' + accessToken);
    };

    let url = this.treeEngineHost + "/menuTrees/findMenuTreeByRoleList/org/" + orgCode + "/app/" + appCode;
    return this.appRestTemplate.httpRestClient(url, "POST",
      roles, null, beforeSend
    );
  },

  getAllApplicationPanelList() {
    let serviceData = this.appConfiguration.getMenuTreeInformation();


    let serviceList = [];
    for (let serviceIndex = 0; serviceIndex < serviceData.length; serviceIndex++) {

      let serviceBusiness = serviceData[serviceIndex]['children'];

      for (let serviceBusinessIndex = 0; serviceBusinessIndex < serviceBusiness.length; serviceBusinessIndex++) {
        serviceList.push({
          id: serviceBusiness[serviceBusinessIndex]['id'],
          routeName: serviceBusiness[serviceBusinessIndex]['code'],
          applicationRouteName: serviceData[serviceIndex]['code'],
          name: serviceBusiness[serviceBusinessIndex]['name'],
          displayName: serviceBusiness[serviceBusinessIndex]['name']
        })
      }

    }

    if (serviceList === []) {
      console.error('GetAllApplicationPanelList: ', 'User Service List Empty');
    } else if (serviceList === null) {
      console.error('GetAllApplicationPanelList: ', 'User Service List Not NULL');
    } else if (serviceList === undefined) {
      console.error('GetAllApplicationPanelList: ', 'User Service List undefined');
    }
    return serviceList;
  },

  getMenuListByPanelCode(panelCode) {

    let menusTemp = [];
    let appList = this.appConfiguration.getMenuTreeInformation();
    for (let appItem of appList) {

      let panelList = appItem['children'];
      for (let appPanel of panelList) {


        if (appPanel['code'] === panelCode) {
          let moduleList = appPanel['children'];
          for (let appModule of moduleList) {

            let serviceHolder = appModule['children'];
            let routeName = appModule['code'];
            menusTemp.push({
              id: appModule['id'],
              name: appModule['name'],
              code: appModule['code'],
              moduleRouteName: routeName,
              serviceDataId: appPanel['id'],
              serviceDataCode: appPanel['code'],
              serviceHolders: serviceHolder,
            });

          }
        }
      }
    }

    if (menusTemp === []) {
      console.error('getMenuListByPanelCode: ', 'User Menu Service Code Not Found');
    }

    return menusTemp;
  },


  createDynamicModel(modelName, modelEntities) {
    let store = this.get('store');
    getOwner(store).register('model:' + modelName, DS.Model.extend(modelEntities));
  },

  setApplicationRouteInformation(appCode,
                                 appPanelCode,
                                 appModuleCode,
                                 appServiceHolderCode,
                                 appMenuTemplateCode,
                                 appSubmenuTemplateCode) {

    let serviceData = this.appConfiguration.getMenuTreeInformation();
    for (let serviceDataItem of serviceData) {

      // if application Id match
      if (serviceDataItem.code === appCode) {
        applicationRouteInformation.applicationId = serviceDataItem.id;
        applicationRouteInformation.applicationCode = serviceDataItem.code;

        let appPanels = serviceDataItem['children'];

        for (let serviceBusinessItem of appPanels) {
          // if app panel matched
          if (serviceBusinessItem.code === appPanelCode) {
            applicationRouteInformation.panelId = serviceBusinessItem.id;
            applicationRouteInformation.panelCode = serviceBusinessItem.code;

            let appModules = serviceBusinessItem['children'];
            for (let module of appModules) {
              // if app moduleCode matched
              if (module.code === appModuleCode) {
                applicationRouteInformation.moduleId = module.id;
                applicationRouteInformation.moduleCode = module.code;


                let appServiceHolders = module['children'];
                processDataBaseOnServiceHolder(appServiceHolders, appMenuTemplateCode, appSubmenuTemplateCode)
              }
            }
          }
        }
      }
    }


  },


  getServiceOrMenuInformation() {
    // menu information(FE) === service information (Backend)

    return {
      serviceId: applicationRouteInformation.menuId,
      serviceCode: applicationRouteInformation.menuCode
    };
  }
  ,

  getApplicationRouteInformation() {
    console.log('message-applicationRouteInformation', this.get('applicationRouteInformation'));
    return applicationRouteInformation;
  },

  getSateList() {
    if (SERVICE_STATES === []) {
      console.error("setApplicationRouteInformation()-Method can't set stateList properly. Might me menu not found")
    }
    return SERVICE_STATES;
  },

  getStartStateId() {
    let stateList = this.getSateList();
    for (let state of stateList) {
      if (state.code.toLowerCase() === 'start') {
        return state.id;
      }
    }
  }

});


let setStates = (stateList) => {
  SERVICE_STATES = stateList
};


let processDataBaseOnServiceHolder = (appServiceHolders, appMenuTemplateCode, appSubmenuTemplateCode) => {


  for (let appServiceHolder of appServiceHolders) {

    let appMenus = [];
    if (appServiceHolder['menuTreeTemplate'].code === SERVICE_HOLDER.MICROSERVICE) {
      appMenus = appServiceHolder['children'];
    } else if (appServiceHolder['menuTreeTemplate'].code === SERVICE_HOLDER.FUNCTION) {
      appMenus = appServiceHolders;
    }
    for (let appMenuItem of appMenus) {
      if (appMenuItem.code === appMenuTemplateCode) {

        // service  === Menu
        applicationRouteInformation.menuId = appMenuItem.id;          // menuId === serviceId
        applicationRouteInformation.menuCode = appMenuItem.code;      // menuCode === serviceCode

        let subMenuList = appMenuItem['subMenuList'];
        for (let subMenu of subMenuList) {

          // submenu match with template code
          if (subMenu.code === appSubmenuTemplateCode) {
            applicationRouteInformation.subFunctionId = subMenu.id;
            applicationRouteInformation.subFunctionCode = subMenu.code;

            let stateList = subMenu.stateList;
            console.log('message---stateList------------------', stateList);
            setStates(stateList);
          }
        }

      }

    }

  }
};
