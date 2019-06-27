import Component from '@ember/component';
import {inject as service} from '@ember/service';

let DEFAULT_SELECTED_TAB_CODE = 'allStates';


export default Component.extend({

  appWelcome: service('nges-core/app-welcome'),
  store: service(),
  appConfiguration: service('app-configuration'),
  rmsSetupService: service('nges-services/rms/rms-setup'),
  rmsBaseService: service('nges-services/rms/rms-base-service'),
  ngesTabTableService: service('nges-elements/nges-tab-table'),
  notifier: service(),

  init() {
    this._super(...arguments);
    //console.log('message', serviceInformation);
    this.createButtonAccess();

    let serviceInformation = this.get('serviceInformation');
    let hostUrl = this.rmsSetupService.getServiceHostUrl(serviceInformation);
    this.set('serviceBaseHostUrl', hostUrl);
  },

  createButtonAccess() {
    let context = this;
    let roleId = this.appConfiguration.getUserRoleId();
    let accessToken = this.appConfiguration.getAccessToken();

    this.rmsBaseService.getClassType(accessToken).then(function (result) {
      let classTypeId = result.data;
      context.rmsBaseService.getUserAbilityToCreate(accessToken, "create", classTypeId, roleId).then(function (result) {
        try {
          if (result.status === 204) {
            context.set("viewCreateButton", false);
          } else {
            context.set("viewCreateButton", true);
          }
        } catch (e) {
        }
      });
    });
  },

  didReceiveAttrs() {
    this._super(...arguments);


    this.initializeTabTableMeta();     // tab table initialize only once

    this.initialLoadTabTableData();
  },
  actions: {
    // callback call from item
    onSelectedSingleStateCallBack(item, actionEventId, stateId) {
      console.log('onSelectedSingleState-Item', item);
      console.log('onSelectedSingleState-actionEventId', actionEventId);
      console.log('onSelectedSingleState-stateId', stateId);

      //console.log('message-onSelectedSingleStateCallBack', JSON.stringify(payload));
      this.performActionEvent(item, actionEventId, stateId);
    },

    onSelectedMultipleStateCallBack(actionEventId) {
      console.log('onSelectedMultipleState-Items', actionEventId);
    },

    onSelectedTabCallBack(tab) {
      console.log('onSelectedTabCallBack-Items', tab);
      this.editPermissionAccess(tab);
    },
  },

  initialLoadTabTableData() {
    let context = this;

    let defaultFunction = 1;
    let defaultLocation = 1;
    this.set('defaultFunction', defaultFunction);
    this.set('defaultLocation', defaultLocation);
    let serviceBaseHostUrl = this.get('serviceBaseHostUrl');


    let accessToken = context.appConfiguration.getAccessToken();
    let roleList = context.appConfiguration.getUserRoleIdList();
    let stateList = context.getStateListIds();

    // request to the server to get table data
    this.ngesTabTableService.loadTabTableData(
      defaultFunction,
      defaultLocation,
      roleList,
      stateList,
      accessToken,
      serviceBaseHostUrl
    ).then(function (result) {
      //console.log('message', JSON.stringify(result));

      context.set('tableData', result);           // initialize tab table headers & table data

    }, function (error) {
      console.log('message', error);
    }).then(function () {
      //console.log('message', 'need to load States');   // todo: need to load States
    });
  },

  getStateListIds() {
    let stateList = [];
    let states = this.get('stateList');
    for (let i = 0; i < states.length; i++) {
      stateList.push(states[i].id)
    }
    return stateList;
  },

  initializeTabTableMeta() {


    // initialize stateList
    let stateList = this.appWelcome.getSateList();


    stateList.unshift({
      'id': 11,
      'name': 'All',
      'code': DEFAULT_SELECTED_TAB_CODE,            //
      'tabContentClass': 'active',   // fade
      'tabTitleClass': 'active'       //
    });

    // selected default active tab
    let activeTabInfo = {
      'id': '00',
      'name': 'All',
      'code': DEFAULT_SELECTED_TAB_CODE,
    };

    this.set('stateActions', []);     // default stateActions

    this.set('stateList', stateList);
    this.set('activeTabInfo', activeTabInfo);
  },

  performActionEvent(item, actionEventId, stateId) {

    let accessToken = this.appConfiguration.getAccessToken();
    let roleId = this.appConfiguration.getUserRoleId();

    let context = this;
    context.rmsBaseService.getClassType(accessToken).then(function (result) {
      let classTypeId = result.data;

      let getNextAllowableStatePayload = {
        classTypeId: classTypeId,
        stateId: stateId,
        roleId: roleId,
        actionEventId: actionEventId
      };

      context.rmsBaseService.getNextAllowableState(accessToken, getNextAllowableStatePayload).then(function (result) {
        try {
          let status = result.data.id;
          let itemId = item.id;
          let payload = {
            data: {
              type: item.type,
              attributes: {
                status: status
              }
            }
          };
          context.rmsBaseService.stateActionUpdate(accessToken, itemId, payload).then(function (result) {
            context.get('notifier').success('Secondary notification');
          })
        } catch (e) {
          console.error('message', 'GetNextAllowableState Not Found');
          context.get('notifier').danger('GetNextAllowableState Not Found');
        }
      });
    });
  },


  editPermissionAccess(tab) {
    let context = this;
    let roleId = this.appConfiguration.getUserRoleId();
    let accessToken = this.appConfiguration.getAccessToken();
    let stateId = tab.id;


    this.rmsBaseService.getClassType(accessToken).then(function (result) {
      let classTypeId = result.data;

      let data = {
        classTypeId: classTypeId,
        roleId: roleId,
        stateId: stateId,
      };
      context.rmsBaseService.getAllAllowableCrudAction(accessToken, data).then(function (result) {
        try {
          console.log('message--result', result);
          if (result.status === 204) {
            context.set("actionAccess", {
              view: false,
              edit: false,
            });
          } else {


            let permission = (result) => {
              let data = {};
              for (let access of result.data) {
                if (access.attributes.name.toLowerCase() === "view") {
                  data['view'] = true;
                }
                if (access.attributes.name.toLowerCase() === "edit") {
                  data['edit'] = true;
                }
              }
              return data
            };

            context.set("actionAccess", permission(result));
          }
        } catch (e) {
        }
      });
    });
  },

})
