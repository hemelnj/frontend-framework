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
  serviceInitializer: service('nges-services/service-initializer'),
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


      /*
      let actionEventId = this.get('onSelectedMultipleStateActions');
      let context = this;
      let activeTabInfo = this.get('activeTabInfo');
      let classTypeId = '';
      let roleId = '';
      let stateId = activeTabInfo.id;*/

      console.log('message', tableBackupDataList);
    },

    onSelectedShowEntries(entries) {
      console.log('message', entries);
    }

  },

  loadStateActions(accessToken, activeStateId, roleId) {


    let context = this;
    context.serviceInitializer.getClassType(accessToken).then(function (result) {
      let classTypeId = result.data;


      let stateActionsPayload = {
        classTypeId: classTypeId,
        stateId: activeStateId,
        roleId: roleId
      };

      context.serviceInitializer.getStateActions(accessToken, stateActionsPayload).then(function (result) {

        try {
          context.set('stateActions', result.data);
        } catch (e) {
          context.set('stateActions', []);
        }
      })
    });
  },


})
