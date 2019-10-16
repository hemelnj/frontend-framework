import Component from '@ember/component';
import Service, {inject as service} from '@ember/service';
import config from 'frontend-engine/config/environment';


export default Component.extend({

  treeEngineHost: config.NGES_SERVICE_HOSTS.TREE_SERVICE_HOST,
  //olcmHost: config.NGES_SERVICE_HOSTS.OLM_SERVICE_HOST,
  rmsHost: config.NGES_SERVICE_HOSTS.APP_OLM_SERVICE_HOST,
  rmsOLMHost: config.NGES_SERVICE_HOSTS.OLM_SERVICE_HOST,

  olmSetupService: service('nges-engines/olm/olm-setup'),
  tree_engine_object_assignment: service('nges-engines/tree-engine/tree-engine-object-assignment'),
  appTreeEngine: service('nges-engines/tree-engine/app-tree-engine'),
  appAuthEngine: service('nges-engines/auth-engine/app-auth-engine'),
  appConfiguration: service('app-configuration'),

  notifier:service(),

  formData: {
    menuItem: null,
    individualSubmenuCode: null,
    stateName: null,
    selectOlmObject: null,
    individualSubmenuId: null,
  },
  router: service(),
  init() {
    this._super(...arguments);
    this.set('subMenuList', []);

    this.loadEntity();

    let templateList =  this.appTreeEngine.getResourceTemplates();

    this.set('templateList',  templateList);
  },

  didReceiveAttrs() {
    this._super(...arguments);

    let context = this;
    let accessToken = this.appConfiguration.getAccessToken();

    let menuTreeUrl = this.treeEngineHost + '/menuTrees';
    //let menuTreeUrl = this.treeEngineHost + '/menuTrees/2'; //rms
    let menuItems = context.appTreeEngine.getMenuItems(accessToken,menuTreeUrl).then(function (result) {
      context.set('menuItems', result.data);
    }).catch(function (errorMsg) {
      context.get('notifier').danger('Failed Load Menu Items');
    });


  },


  loadEntity() {

    let context = this;
    let root = 1;
    let accessToken = this.appConfiguration.getAccessToken();
    let allCreatedEntity = this.appAuthEngine.getAllEntity(root, accessToken);

    allCreatedEntity.then(function (entity) {
      context.set('entityList', entity.data.attributes.children);

    });

  },

  loadOrganization(orgList) {
    this.set('orgList', orgList);
  },

  loadApplication(orgId) {
    let context = this;
    let accessToken = this.appConfiguration.getAccessToken();
    let allCreatedUsers = this.appAuthEngine.getAllApplication(orgId, accessToken);

    allCreatedUsers.then(function (application) {
      context.set('appList', application.data);
    });
  },

  loadOlmObject(orgCode, appCode) {
    let context = this;
    let engineCode = "olm";
    let accessToken = this.appConfiguration.getAccessToken();
    let classtypes = context.olmSetupService.getAllClassType(orgCode, appCode, engineCode, accessToken);
    classtypes.then(function (result) {
      console.log('olmObjects--------', result.data);
      context.set('olmObjects', result.data);
    }).catch(function (errorMsg) {
      console.log('Failed To Load OLM Objects');
    });
  },

  loadRoles(orgId) {
    let context = this;
    let accessToken = this.appConfiguration.getAccessToken();
    let roles = context.appAuthEngine.getAllRolesByOrganization(orgId, accessToken).then(function (result) {
      console.log('listUserRoles', result.data);
      context.set('listUserRoles', result.data);
    }).catch(function (errorMsg) {
      console.log('Failed To Load Roles');
    });
  },

  menuTreeProcessing(url, formData, menuTree, subMenuList) {

    //console.log('message-formData', formData);
    //console.log('message-menuTree', menuTree);
    //console.log('message-subMenuList', subMenuList);

    let accessToken = this.appConfiguration.getAccessToken();
    let context = this;
    let timestamp = Math.floor(Date.now() / 1000);
    let data = {
      data: {
        type: "menutree",
        id: menuTree.id,
        attributes: {
          "classTypeId": formData.selectOlmObject.id,
          "code": "menuCode",
          "comments": "string",
          "createdAt": 0,
          "createdBy": "string",
          "describtion": "string",
          "extra": "string",
          "id": formData.selectOlmObject.id,
          "lastUpdatedAt": 0,
          "lastUpdatedBy": "string",
          "name": "string",
          menuTree: {
            "id": menuTree.id,
            "subMenuList": subMenuList,
            "code": "menuTreeCode",
            "comments": "string",
            "createdAt": 0,
            "createdBy": "string",
            "describtion": "string",
            "extra": "string",
            "lastUpdatedAt": 0,
            "lastUpdatedBy": "string",
            "menuTreeTemplate": {
              "id": 2
            },
            "parent": {
              "id": 2
            },
            "name": formData.selectOlmObject.name
          }
        }
      }
    };

    console.log('message', data);

    let postMenuItem = context.appTreeEngine.postMenuItemToObjectAssignment(accessToken,data,url).then(function (result) {

    }).catch(function (msg) {
      context.get('notifier').success('Saved Successfully');
    });


  },
  actions: {
    selectMenuItem(value) {
      this.set('formData.menuItem',value);
    },

    onChangeEntity(value) {
      let entityData = JSON.parse(value);
      let orgList = entityData.children;
      this.loadOrganization(orgList);
    },

    onChangeOrganization(value) {
      let orgData = JSON.parse(value);
      let orgCode = orgData.code;
      this.set('orgCode', orgCode);
      this.loadApplication(orgData.id);
      this.loadRoles(orgCode);
    },

    onChangeApplication(value) {
      let appData = JSON.parse(value);
      let appCode = appData.attributes.code;
      this.set('appCode', appCode);
      console.log('appCode', appCode);
      let orgCode = this.get('orgCode');
      this.loadOlmObject(orgCode, appCode);

    },

    selectTemplateList(value) {
      console.log('message--selectTemplateList', value.attributes.code);
      this.set('formData.individualSubmenuCode',value.attributes.code);
    },
    selectOlmObject(value) {
      let selectOlmObject = value;
      let menuItem = this.get('formData.menuItem');
      let accessToken = this.appConfiguration.getAccessToken();

      let menuItemId = menuItem.id;

      let selectOlmObjectId = selectOlmObject.id;


      this.set('formData.selectOlmObject', selectOlmObject);// updated form data

      let context = this;
      let olmObjectWiseStatesUrl = context.rmsOLMHost + '/classtypes/' + selectOlmObjectId + '/allStatesInAlphabeticOrder';


      let olmObjectWiseStates = context.appTreeEngine.getOLMObjectWiseStates(accessToken,olmObjectWiseStatesUrl);

      olmObjectWiseStates.then(function (result) {

        let subMenuListUrl = context.treeEngineHost + '/menuTrees/' + menuItemId;

        let subMenuList = context.appTreeEngine.getSubMenuList(accessToken,subMenuListUrl);

        subMenuList.then(function (subMenus) {
          let dualBoxStates = result.data;
          subMenus = JSON.parse(JSON.stringify(subMenus));


          let tempDualBoxStates = dualBoxStates;
          let subMenuList = subMenus.data.attributes.subMenuList;


          for (let i = 0; i < tempDualBoxStates.length; i++) {
            for (let j = 0; j < subMenuList.length; j++) {

              // added each states initial code
              subMenuList[j]['menuTree'] = {
                id: menuItemId
              };


              let subMenuStates = subMenuList[j].stateList;
              console.log('message-subMenuStates-', subMenuStates);
              console.log('message-subMenuStates-Length', subMenuStates.length);


              for (let k = 0; k < subMenuStates.length; k++) {
                if(subMenuStates[k].id || tempDualBoxStates[i].id){
                  console.log('message-subMenuStates[k].id', subMenuStates[k].id);
                  console.log('message-tempDualBoxStates[i].id', tempDualBoxStates[i].id);
                  if (tempDualBoxStates[i].id !== subMenuStates[k].id) {
                    dualBoxStates.splice(i, 1);
                  }
                }
              }
            }
          }

          let data = {
            available: dualBoxStates,
            selected: []
          };


          context.set('dualBoxData', data);
          context.set('subMenuList', subMenus.data.attributes.subMenuList);
        });

      }).catch(function (errorMsg) {
        context.get('notifier').danger('Failed To Load OLM Object wise States');
      });

    },

    removeItemAction(item) {
      //console.log('message-removeItemAction', item);
      this.get('subMenuList').removeObject(item);

      item.stateList.forEach((item, index) => {
        this.get("dualBoxData.available").pushObject(item);
      });
    },


    editItemAction(item) {
      let data = this.get("dualBoxData.selected");
      console.log('message-editItemAction-data', data);
      //remove item from view table
      this.get('subMenuList').removeObject(item);


      // restore data for edit
      this.set('formData.stateName', item.name);
      this.set('formData.individualSubmenuId', item.id);
      this.set('formData.individualSubmenuCode', item.code);


      let stateListInTable = item.stateList;

      let sList = [];

      for (let i = 0; i < stateListInTable.length; i++) {
        sList.push(
          {
            type: "states",
            id: stateListInTable[i].id,
            attributes: stateListInTable[i]
          });

      }

      console.log('message--sList', sList);
      sList.forEach((states, index) => {
        this.get("dualBoxData.selected").pushObject(states);
      });
      console.log('this.get("dualBoxData")', this.get("dualBoxData"));
    },


    addSubMenu() {

      let individualSubmenuCode = this.get('formData.individualSubmenuCode');
      let individualSubmenuId = this.get('formData.individualSubmenuId');


      let timestamp = Math.floor(Date.now() / 1000);

      //let menuTree = JSON.parse(this.get('formData.menuItem'));
      let menuTree = (this.get('formData.menuItem'));

      let stateList = this.get('dualBoxData.selected');


      let tempStatList = [];
      for (let i = 0; i < stateList.length; i++) {

        tempStatList.push(
          {
            code: stateList[i].attributes.code,
            order: i+1,
            comments: stateList[i].attributes.comments,
            createdAt: stateList[i].attributes.createdAt,
            createdBy: stateList[i].attributes.createdBy,
            describtion: stateList[i].attributes.describtion,
            extra: stateList[i].attributes.extra,
            id: stateList[i].id,
            lastUpdatedAt: stateList[i].attributes.lastUpdatedAt,
            lastUpdatedBy: stateList[i].attributes.lastUpdatedBy,
            name: stateList[i].attributes.name,
            subMenuList: stateList[i].attributes.subMenuList,
          }
        );
      }

      stateList['subMenuList'] = [];

      this.get('subMenuList').pushObject(
        {
          "code": individualSubmenuCode,
          "comments": "string",
          "createdAt": 1,
          "createdBy": "string",
          "describtion": "string",
          "extra": "string",
          "id": individualSubmenuId === null ? timestamp : individualSubmenuId,
          "lastUpdatedAt": 1,
          "lastUpdatedBy": "string",
          "menuTree": {
            "id": menuTree.id
          },
          "name": this.get('formData.stateName'),
          "stateList": tempStatList
        });

      this.set("dualBoxData.selected", []);
      this.get('formData.individualSubmenuId', null);   // after edited reset id

    },

    saveData() {

      let formData = this.get('formData');
      //let menuTree = JSON.parse(this.get('formData.menuItem'));
      let menuTree = this.get('formData.menuItem');

      let subMenuList = this.get('subMenuList');

      console.log('message-saveData-subMenuList', subMenuList);
      let saveUrl = this.treeEngineHost + '/menuTreeOLMObjects';

      this.menuTreeProcessing(saveUrl, formData, menuTree, subMenuList);

    },

    updateData() {
      let formData = this.get('formData');
      let menuTree = JSON.parse(this.get('formData.menuItem'));
      let subMenuList = this.get('subMenuList');

      let context = this;
      let saveUrl = this.treeEngineHost + '/menuTreeOLMObjects';
      this.tree_engine_object_assignment.menuTreePUTProcessing(saveUrl, formData, menuTree, subMenuList).then(function (result) {
        context.get('notifier').success('Updated Successfully');
      }).catch(function (errorMsg) {
        context.get('notifier').danger('Failed To Update');
      });
    },

  },


});
