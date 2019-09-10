import Component from '@ember/component';
import {inject as service} from '@ember/service';
import config from 'frontend-engine/config/environment';
import Ember from 'ember';

export default Component.extend({
  treeEngineHost: config.NGES_SERVICE_HOSTS.TREE_SERVICE_HOST,
  olmHost: config.NGES_SERVICE_HOSTS.OLM_SERVICE_HOST,
  authEngineHost: config.NGES_SERVICE_HOSTS.AUTH_SERVICE_HOST,
  isSidebarActive: false,


  appTreeEngine: service('nges-engines/tree-engine/app-tree-engine'),
  appAuthEngine: service('nges-engines/auth-engine/app-auth-engine'),
  appConfiguration: service('app-configuration'),
  notifier: service(),
  userInfo: {
    name: '',
    password: '',
  },

  init() {
    this._super(...arguments);

    this.set('selectedResult', []);

    this.set('dataContextFunctionTree', {});
    this.set('dataContextLocationTree', {});

    this.loadEntity();

  },



  loadEntity() {

    let context = this;
    let root = 1;
    let accessToken = this.appConfiguration.getAccessToken();
    let allCreatedUsers = this.appAuthEngine.getAllEntity(root, accessToken);

    allCreatedUsers.then(function (entity) {
      context.set('entityList', entity.data.attributes.children);
    });

  },

  loadAllUser(entityId) {
    let context = this;
    let accessToken = this.appConfiguration.getAccessToken();
    let allCreatedUsers = this.appAuthEngine.getAllUserEntityWise(entityId, accessToken);

    allCreatedUsers.then(function (entity) {
      context.set('userList', entity.data);
    });
  },


  loadRoleByUser(userId) {
    let context = this;
    let accessToken = this.appConfiguration.getAccessToken();
    let allCreatedUsers = this.appAuthEngine.getRoleByUserId(userId, accessToken);

    allCreatedUsers.then(function (role) {
      context.set('roleList', role.data);
    });
  },


  treeTraverseToGetOnlySelectedItem(contextTree, selectedClassTypeId) {

    let context = this;
    if (contextTree.children === undefined) return;


    if(contextTree.id === selectedClassTypeId){
      //contextTree.isItThere=true;
      Ember.set(contextTree, 'isItThere', true);
    }else {

      Ember.set(contextTree, 'isItThere', false);
      //contextTree.isItThere=false;
    }

    for (let i = 0; i < contextTree.children.length; i++) {
      context.treeTraverseToGetOnlySelectedItem(contextTree.children[i], selectedClassTypeId);
    }
  },

  treeTraverseToGetOnlySelectedItemWithoutId(contextTree) {

    let context = this;
    if (contextTree.children === undefined) return;


    console.log('message-contextTree', contextTree.name, contextTree.isItThere);
    for (let i = 0; i < contextTree.children.length; i++) {
      if(contextTree.children[i].isItThere === true){
        return contextTree.children[i];
      }
      context.treeTraverseToGetOnlySelectedItemWithoutId(contextTree.children[i]);
    }
  },

  actions: {

    onChangeEntity(entityId){
      this.set('entityId', entityId);
      this.loadAllUser(entityId);
    },

    autocompleteOnSelectAction(selectedValue){
      let userData = selectedValue;
      let userId = userData.id;
      let userName = userData.attributes.name;
      let entityId = this.get('entityId');
      console.log('userName', userName);
      this.set('userName', userName);
      this.set('userId', userId);
      this.loadRoleByUser(userId);

      let context = this;
      let accessToken = this.appConfiguration.getAccessToken();
      //this.set('userId', selectedValue.id);

      let locationalHieararchyData = this.appTreeEngine.getLocationalHierarchyById(userId, entityId, accessToken).then(function (result) {
        console.log('locationalHieararchyData', result.data.attributes);
        context.set('dataContextLocationTree', result.data.attributes);
      }).catch(function (errorMsg) {
        context.get('notifier').danger('Failed To Load Locational Hierarchy by User Id');
      });

      let functionalHieararchyData = this.appTreeEngine.getFunctionalHierarchyById(userId, entityId, accessToken).then(function (result) {
        console.log('functionalHieararchyData', result.data.attributes);
        context.set('dataContextFunctionTree', result.data.attributes);
      }).catch(function (errorMsg) {
        context.get('notifier').danger('Failed To Load Functional Hierarchy by User Id');
      });
    },

    treeDataFunctionModifiedAction(treeSelectedData, isActive) {

      this.treeTraverseToGetOnlySelectedItem(this.get('dataContextFunctionTree'),treeSelectedData.id);
      this.set('treeDataFunctionModified', treeSelectedData);
    },
    treeDataLocationModifiedAction(treeSelectedData, isActive) {
      this.treeTraverseToGetOnlySelectedItem(this.get('dataContextLocationTree'),treeSelectedData.id);
      this.set('treeDataLocationModified', treeSelectedData);
    },

    savedUserInfo() {
      let roleList = this.get('roleList');
      let role=[];
      let data={};
      for (let i = 0; i <roleList.length ; i++) {
        if(roleList[i].id != 18){
          data={
            id:roleList[i].id,
          };
          role.pushObject(data);
        }

      }

      let treeDataFunctionModified = this.get('treeDataFunctionModified');
      let treeDataLocationModified = this.get('treeDataLocationModified');

      if(treeDataFunctionModified===undefined){
        let defaultSelectedFunction = this.treeTraverseToGetOnlySelectedItemWithoutId(this.get('dataContextFunctionTree'));
        treeDataFunctionModified=defaultSelectedFunction;
      }

      if(treeDataLocationModified===undefined){
        let defaultSelectedLocation = this.treeTraverseToGetOnlySelectedItemWithoutId(this.get('dataContextLocationTree'));
        treeDataLocationModified=defaultSelectedLocation;
      }

      let accessToken = this.appConfiguration.getAccessToken();

      if (treeDataFunctionModified !== undefined && treeDataLocationModified !== undefined) {

        let context = this;

        let submitData = {

          "functionalHierarchy": {
            "id": treeDataFunctionModified.id
          },
          "id": this.get('userId'),

          "locationHierarchy": {
            "id": treeDataLocationModified.id
          },

          "name": this.get('userName'),
          "roleList": role
        };

        console.log('roleListroleList', role);
        console.log('message-submitData', JSON.stringify(submitData));

        let locationContextTree = context.appTreeEngine.postDataContext(accessToken,submitData).then(function (result) {
          if(result.data == false){
            context.get('notifier').danger('Failed to Assign User with Default Function and Location');
          }else{
            context.get('notifier').success('User Successfully Assigned with Default Function and Location');
          }
          role=[];

        }).catch(function (errorMsg) {
          context.get('notifier').danger('Failed to Assign User with Default Function and Location');
        });

      } else {
        let context = this;
        context.get('notifier').danger('Must select Function && Location Default');
      }
    }
  },
});
