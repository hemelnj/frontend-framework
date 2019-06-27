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
  appConfiguration: service('app-configuration'),
  notifier: service(),
  userInfo: {
    name: '',
    password: '',
  },

  init() {
    this._super(...arguments);

    this.set('selectedResult', []);

    let context = this;
    let accessToken = this.appConfiguration.getAccessToken();

    context.set('dataContextFunctionTree', {});
    let dataContextDataUrl = context.treeEngineHost + '/functionalHierarchies/1';
    let dataContextTree = context.appTreeEngine.getDataContext(accessToken,dataContextDataUrl);
    dataContextTree.then(function (result) {
      result = result.data;
      console.log('message-inside init', result);
      context.set('dataContextFunctionTree', result);
    }).catch(function (errorMsg) {
      context.get('notifier').danger('Failed To Load Function Tree');
    });

    context.set('dataContextLocationTree', {});
    let locationContextDataUrl = context.treeEngineHost + '/locationHierarchies/1';
    let locationContextTree = context.appTreeEngine.getDataContext(accessToken,locationContextDataUrl);
    locationContextTree.then(function (result) {
      result = result.data;
      context.set('dataContextLocationTree', result);
    }).catch(function (errorMsg) {
      context.get('notifier').danger('Failed To Load Location Tree');
    });


    this.set('listUserRoles', {});
    let roleRequest = context.appTreeEngine.getAllRoles(accessToken).then(function (result) {
      context.set('listUserRoles', result);
    }).catch(function (errorMsg) {
      context.get('notifier').danger('Failed To Load User Roles');
    });



    let userData = context.appTreeEngine.getAllUsers(accessToken).then(function (result) {
      context.set('userList', result.data);
    }).catch(function (errorMsg) {
      context.get('notifier').danger('Failed To Load Users');
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

    autocompleteOnSelectAction(selectedValue){
      console.log('message', selectedValue);

      let flag=true;
      let userRole = selectedValue.attributes.roles;


      let accessToken = this.appConfiguration.getAccessToken();
      let context = this;


      let defaultRole={
        id:1,
        name:"role_user"
      };

      for (let i = 0; i < userRole.length; i++) {
        if(userRole[i].id===1){
          flag=false;
        }
      }

      if(flag){
        userRole = userRole.push(defaultRole);
      }

      this.set('userId',selectedValue.id);
      this.set('userRole',userRole);


      let locationalHieararchyData = this.appTreeEngine.getLocationalHierarchyById(selectedValue.id,accessToken).then(function (result) {
        context.set('dataContextLocationTree', result.data.attributes);
      }).catch(function (errorMsg) {
        context.get('notifier').danger('Failed To Load Locational Hierarchy by User Id');
      });

      let functionalHieararchyData = this.appTreeEngine.getFunctionalHierarchyById(selectedValue.id,accessToken).then(function (result) {
        context.set('dataContextFunctionTree', result.data.attributes);
      }).catch(function (errorMsg) {
        context.get('notifier').danger('Failed To Load Functional Hierarchy By User Id');
      });

      //this.dataInit(classType.id);
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
      let userInfo = this.get('userInfo');
      let roleList = this.get('userRole');

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

          "name": userInfo.name,
          "roleList": roleList
        };

        console.log('message-submitData', JSON.stringify(submitData));

        let locationContextTree = context.appTreeEngine.postDataContext(accessToken,submitData).then(function (result) {
          context.get('notifier').success('User Successfully Assigned with Default Function and Location');
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
