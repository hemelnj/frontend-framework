import Component from '@ember/component';
import {inject as service} from '@ember/service';
import config from 'frontend-engine/config/environment';
import Ember from 'ember';

export default Component.extend({

  appConfiguration: service('app-configuration'),
  appTreeEngine: service('nges-engines/tree-engine/app-tree-engine'),
  olmSetupService: service('nges-engines/olm/olm-setup'),
  appAuthEngine: service('nges-engines/auth-engine/app-auth-engine'),

  treeEngineHost: config.NGES_SERVICE_HOSTS.TREE_SERVICE_HOST,
  notifier: service(),

  selectedClassType: '',
  selectedRole: '',

  init() {
    this._super(...arguments);

    this.loadEntity();

    this.set('listGroupData', []);
    this.set('modifiedTreeDataLists', []);
    this.set('dataContextTree', []);

    // meta data for tree view test components
    let items = [{name: 'First Level-1', items: [{name: 'Second Level-1-1'}, {name: 'Second Level-1-2'}]},
      {
        name: 'First Level-2', items: [{
          name: 'Second Level-2-1',
          items: [{name: 'Third Level-2-1-1'},
            {name: 'Third Level-2-1-2'}, {
              name: 'Third Level-2-1-3',
              items: [{name: 'Forth Level-2-1-3-1'}]
            }]
        },
          {name: 'Second Level-2-2'}]
      },
      {name: 'First Level-3'}];
    this.set('items', items);
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
      console.log('classtypes', result.data);
      context.set('classtypes', result.data);
    }).catch(function (errorMsg) {
      console.log('Failed To Load OLM Objects');
    });
  },

  loadRoles(orgCode) {
    let context = this;
    let accessToken = this.appConfiguration.getAccessToken();
    let roles = context.appAuthEngine.getAllRolesByOrganization(orgCode, accessToken).then(function (result) {
      console.log('listUserRoles', result.data);
      context.set('listUserRoles', result.data);
    }).catch(function (errorMsg) {
      console.log('Failed To Load Roles');
    });
  },

  actions: {

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

    onChangeClassTypes(value) {
      console.log('message-onChangeClassTypes', value);
      this.set('selectedClassType', value);

    },
    onChangeRoles(value) {
      this.set('selectedRole', value);

    },

    onChangeDataContext(value) {

      let selectedRole = this.get('selectedRole');
      let selectedClassType = this.get('selectedClassType');
      let selectedClassId = selectedClassType.id;

      let treeHierarchy = 2;


      let context = this;
      let flag = false;
      let dataContextDataUrl = '';
      if (value === 'functionsWise') {
        dataContextDataUrl = context.treeEngineHost + '/functionalHierarchies/dataContextTree/role/' + selectedRole + '/classTypeId/' + selectedClassId;
        context.set('dataContextUpdateUrl', '/functionalDatacontexts/updateList');
        flag = true;

      } else if (value === 'locationWise') {
        dataContextDataUrl = context.treeEngineHost + '/locationHierarchies/dataContextTree/role/' + selectedRole + '/classTypeId/' + selectedClassId;

        context.set('dataContextUpdateUrl', '/locationDatacontexts/updateList');
        flag = true;
      }
      else {
        flag = false;
      }


      if (flag) {
        let accessToken = this.appConfiguration.getAccessToken();
        let dataContextTree = context.appTreeEngine.getDataContext(accessToken, dataContextDataUrl);
        dataContextTree.then(function (result) {
          result = result.data.attributes;
          context.set('dataContextTree', result);
        }).catch(function (msg) {
          context.get('notifier').danger('Failed To Load Data Context Tree');
        });
      }
      this.set('modifiedOnlyTrueDataList', []);
    },

    saveSelectedResult() {

      let context = this;

      let dataContextTreeData = this.get('dataContextTree');
      let modifiedOnlyTrueDataList = this.get('modifiedOnlyTrueDataList');
      let dataContextUpdateUrl = this.treeEngineHost + this.get('dataContextUpdateUrl');

      let selectedClassType = {};
      try {
        selectedClassType = JSON.parse(this.get('selectedClassType'));
      } catch (e) {
        alert('Select Class Type First')
      }

      let selectedRoleId = this.get('selectedRole');
      this.treeTraverseToGetOnlySelectedItem(dataContextTreeData, selectedClassType.id, selectedRoleId);


      console.log('message-modifiedOnlyTrueDataList', modifiedOnlyTrueDataList);
      let accessToken = this.appConfiguration.getAccessToken();

      let dataContextTreeRequest = context.appTreeEngine.putDataContext(accessToken, dataContextUpdateUrl, modifiedOnlyTrueDataList);
      dataContextTreeRequest.then(function (result) {
        console.log('message-updated', result);
        context.get('notifier').success('Saved Successfully');
      }).catch(function (errorMsg) {
        context.get('notifier').danger('Failed To Save');
      });

    },


    treeDataModifiedAction(treeSelectedData, isActive) {

      console.log('message', '-----------------------------');
      console.log('message-selected', treeSelectedData.name);
      console.log('message-selected-isActive', isActive);
      console.log('message-treeSelectedData-children', treeSelectedData.children);
      console.log('message', '-----------------------------');


      let context = this;
      let selectedClassType = {};
      try {
        selectedClassType = JSON.parse(this.get('selectedClassType'));
      } catch (e) {
        alert('Select Class Type First')
      }

      let selectedRoleId = this.get('selectedRole');
      let modifiedTreeDataLists = this.get('modifiedTreeDataLists');


      // check box toggling checked and unchecked
      Ember.set(treeSelectedData, 'isItThere', isActive);

      this.treeCheckboxCheckUncheckProcess(treeSelectedData, modifiedTreeDataLists);


      context.modifiedDataProcess(
        treeSelectedData,
        modifiedTreeDataLists
      );


    },
  },

  index: 0,
  treeTraverseToGetOnlySelectedItem(contextTree, selectedClassTypeId, selectedRoleId) {

    let context = this;
    if (contextTree.children === undefined) return;

    context.index++;

    if (contextTree.isItThere) {
      //console.log('message-contextTree', contextTree.name);

      let timestamp = Math.floor(Date.now() + context.index);


      console.log('message-contextTree', timestamp);

      let modifiedData = {
        id: timestamp,
        name: contextTree.name,
        code: contextTree.code,
        describtion: 'describtion',
        createdBy: 'createdBy',
        createdAt: 0,
        lastUpdatedAt: 0,
        lastUpdatedBy: 'lastUpdatedBy',
        comments: 'comments',
        extra: 'extra',
        roleId: selectedRoleId,
        classTypeId: selectedClassTypeId,
        hierarchy: {
          id: contextTree.id
        },
        isActive: true,     //only selected value
      };

      context.get('modifiedOnlyTrueDataList').pushObject(modifiedData);
    }


    for (let i = 0; i < contextTree.children.length; i++) {
      context.treeTraverseToGetOnlySelectedItem(contextTree.children[i], selectedClassTypeId, selectedRoleId);
    }
  },

  modifiedDataProcess(treeSelectedData, modifiedTreeDataLists) {

    modifiedTreeDataLists.forEach(function (v, k) {
      if (v.hierarchy.id === treeSelectedData.id) {
        modifiedTreeDataLists.splice(v, 1);
      }
    });
  },

  treeCheckboxCheckUncheckProcess(treeSelectedData, isActive) {

    let context = this;
    treeSelectedData.children.forEach(function (v, k) {
      Ember.set(v, 'isItThere', isActive);
    });
  }

});
