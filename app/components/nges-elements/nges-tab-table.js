import Component from '@ember/component';
import config from 'frontend-engine/config/environment';
import $ from "jquery";
import Service, {inject as service} from '@ember/service';

let DEFAULT_SELECTED_TAB_CODE = ''; // updated in on initialization time

export default Component.extend({

  store: service(),
  isAllChecked: false,
  isMultipleChecked: false,
  searchKeyword: '',
  appWelcome: service('nges-core/app-welcome'),
  appConfiguration: service('app-configuration'),
  ngesTabTableService: service('nges-elements/nges-tab-table'),
  rmsBaseService: service('nges-services/rms/rms-base-service'),
  rmsSetup: service('nges-services/rms/rms-setup'),
  init() {
    this._super(...arguments);


    this.set('tableShowEntries', [5, 10, 15, 20]);

    // update default globally default selection code
    this.set('DEFAULT_SELECTED_TAB_CODE', 'allStates');
    DEFAULT_SELECTED_TAB_CODE = this.get('DEFAULT_SELECTED_TAB_CODE');


    this.set('isAllChecked', false);
    this.set('isMultipleChecked', false);
    //this.initialization();
  },

  loadTabsInformation() {
    let activeTabInfo = this.get('activeTabInfo');
    let stateList = this.get('stateList');

    let processedTabMeta = this.ngesTabTableService.getProcessedTabMeta(activeTabInfo, stateList);
    this.set('tabsData', processedTabMeta);

    this.set('activeTabInfo', activeTabInfo); // set default selected tab information
  },

  didReceiveAttrs() {
    this._super(...arguments);
    // this.mockTabsData();
    this.loadTabsInformation();

  },


  getStateListIds() {
    let stateList = [];
    let states = this.get('stateList');
    for (let i = 0; i < states.length; i++) {
      stateList.push(states[i].id)
    }
    return stateList;
  },

  actions: {
    onSelectedItemAction(item) {


    },
    onSearchKeyUpAction(value) {

      console.log('message-onSearchKeyUpAction', value);

    },

    selectedTabData(tab) {
      let tabInformation = tab === '' ? {} : JSON.parse(tab);
      // console.log('selectedTabData', tabInformation);

      let stateList = [];

      this.set('activeTabInfo.id', tabInformation.id);
      this.set('activeTabInfo.name', tabInformation.name);
      this.set('activeTabInfo.code', tabInformation.code);

      if (tabInformation.code === DEFAULT_SELECTED_TAB_CODE) {
        this.set('isAllChecked', false);
        this.set('isMultipleChecked', false);
        stateList = this.getStateListIds();
      } else {
        stateList.push(tabInformation.id);
      }

      let context = this;


      let defaultFunction = this.get('defaultFunction');
      let defaultLocation = this.get('defaultLocation');
      let accessToken = context.appConfiguration.getAccessToken();
      let roleList = context.appConfiguration.getUserRoleIdList();



      // load tab table data to request
      context.ngesTabTableService.loadTabTableData(
        defaultFunction,
        defaultLocation,
        roleList,
        stateList,
        accessToken
      ).then(function (result) {
        //console.log('message', JSON.stringify(result));

        context.set('tableData', result);           // initialize tab table headers & table data

      }, function (error) {
        console.log('message', error);
      }).then(function (tableData) {
        console.log('message', 'load States');

        let activeStateId = tabInformation.id;
        let roleId = roleList[0];

        context.loadStateActions(accessToken, activeStateId, roleId);


      });

      this.set('tabInformation',tabInformation);

      this.onSelectedTabCallBack(tabInformation);  // call parent component method
    },

    allSelectedAction() {
      // console.log('allSelectedAction', this.tableData);
      this.toggleProperty('isAllChecked'); // toggleProperty used for checkbox (checked and unchecked)

      if (this.isAllChecked) {
        this.set('tableBackupDataList', this.get('tableData'));
        this.set('isMultipleChecked', true);

      } else {
        this.set('isMultipleChecked', false);
        this.set('tableBackupDataList', []);
      }
    },

    onSelectedSingleState(item, actionEventId) {
      let stateId = this.get('activeTabInfo.id');
      this.onSelectedSingleStateCallBack(item, actionEventId, stateId);      // callback method call in parent component
    },

    onSelectedMultipleState(actionEventId) {
      console.log('onSelectedMultipleState-actionEventId', this.get('tableBackupDataList'));
      console.log('onSelectedMultipleState-actionEventId', actionEventId);
      this.set('onSelectedMultipleStateActions', actionEventId);

      let selectedDataList = this.get('tableBackupDataList');
      this.onSelectedMultipleStateCallBack(actionEventId, selectedDataList);
    },


    onSaveChanges() {

      let itemsId = [];
      let tableBackupDataList = this.get('tableBackupDataList');

      tableBackupDataList.forEach(function (item) {
        itemsId.push(item.id);
      });


      console.log('message', tableBackupDataList);
    },

    onSelectedShowEntries(entries) {
      console.log('message', entries);
    }

  },

  loadStateActions(accessToken, activeStateId, roleId) {


    let context = this;
    context.rmsBaseService.getClassType(accessToken).then(function (result) {
      let classTypeId = result.data;


      let stateActionsPayload = {
        classTypeId: classTypeId,
        stateId: activeStateId,
        roleId: roleId
      };

      context.rmsBaseService.getStateActions(accessToken, stateActionsPayload).then(function (result) {

        try {
          context.set('stateActions', result.data);
        } catch (e) {
          context.set('stateActions', []);
        }
      })
    });
  },




})
