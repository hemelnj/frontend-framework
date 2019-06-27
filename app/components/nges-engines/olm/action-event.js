import Component from '@ember/component';
import config from 'frontend-engine/config/environment';
import {inject as service} from '@ember/service';
import $ from "jquery";

export default Component.extend({

  name: '',
  code: '',
  data: '',

  appConfiguration: service('app-configuration'),
  olmSetupService: service('nges-engines/olm/olm-setup'),
  notifier:service(),
  init() {
    this._super(...arguments);
    this.set('resetClick', true);
    this.set('editClick', false);
    this.set('showTable', false);
    this.loadData();
  },

  loadData() {
    let context = this;
    let accessToken = this.appConfiguration.getAccessToken();
    let allCreatedActionEvents = this.olmSetupService.getAllActionEvents(accessToken);

    allCreatedActionEvents.then(function (msg) {
      context.set('actionEventList', msg.data);
      context.didReceiveAttrs();
    }).catch(function (errorMsg) {
      context.get('notifier').danger('Failed To Load Action Events');
    });

  },


  didReceiveAttrs() {
    this._super(...arguments);
    this.set('tmpActionEventList', this.get('actionEventList'));
  },


  actions: {
    onChangeClassTypes(value) {
      let classType = JSON.parse(value);
      console.log('onChangeClassTypeId (or objectId):', classType.id);
      this.loadData();
    },

    getFilterKey(searchKeyword) {
      let tmpActionEventList = this.get('tmpActionEventList');
      let actionEventList = tmpActionEventList;
      let actionEventListRes = actionEventList.filter(function (el) {
        return (el.attributes.name.includes(searchKeyword));
      });

      if (searchKeyword.trim() === '') {
        this.set('actionEventList', tmpActionEventList);
      } else {
        this.set('actionEventList', actionEventListRes);
      }
    },

    actionNameCheck(value) {

      let actionEventList = this.get('actionEventList');
      let res = actionEventList.filter(function (el) {
        return (el.attributes.name.includes(value));
      });

      if (res[0] !== undefined) {
        if (res[0].attributes.name === value) {
          this.set('nameMatchedAlert', true);
          console.log('message-matched', 'matched');

        } else {
          this.set('nameMatchedAlert', false);
          console.log('message-not matched', 'not matched');
        }
      }

    },


    save() {
      let params = this.$("#actionEventInfo").serializeArray();

      // convert parameters to dictionary
      const paramsDict = {};
      params.forEach((param) => {
        paramsDict[param.name] = param.value;
      });

      let actionEventData = JSON.parse(JSON.stringify(paramsDict));
      let timestamp = Math.floor(Date.now() / 1000);
      let actionEventDataFromUI = {
        data: {
          'id': timestamp,
          'type': 'actionevents',
          attributes: {
            "name": actionEventData.role,
            "id": timestamp,
            "extra": "1",
            "code": actionEventData.classTypeCode,
            "createdAt": 1,
            "lastUpdatedBy": "1",
            "lastUpdatedAt": 1,
            "comments": "1",
            "describtion": actionEventData.roleDescription,
            "createdBy": "11",
            "edges": null
          }
        }
      };


      if (actionEventDataFromUI.data.attributes.name && actionEventDataFromUI.data.attributes.code && actionEventDataFromUI.data.attributes.describtion) {
        let accessToken = this.appConfiguration.getAccessToken();
        let responseAfterAddingActionEvent = this.olmSetupService.addNewActionEvent(actionEventDataFromUI, accessToken);

        let context = this;
        responseAfterAddingActionEvent.then(function (msg) {
          if (msg) {
            context.get('notifier').success('New State Added');
            context.loadData();
          } else {
            context.get('notifier').danger('Failed To Add New State');
          }
        });
      } else {
        let context = this;
        context.get('notifier').danger('Fill all the input fields');
      }

    },

    refreshPage() {
      this.set('name', '');
      this.set('code', '');
      this.set('description', '');
      this.init();
    },

    viewTableData() {
      this.set('showTable', true);
    },

    deleteActionEvent(item) {
      console.log('message-delete action name:', item);
    },

    editActionEvent(item) {
      console.log('message-edit action event', item);
      this.set('name', item.attributes.name);
      this.set('code', item.attributes.code);
      this.set('description', item.attributes.describtion);
      this.set('resetClick', false);
      this.set('editClick', true);
      this.set('actionEvent', item.attributes) // pass value so that we can updateEvent
    },

    updateActionEvent(actionEvent) {

      let formId = '#' + 'actionEventInfo';
      let params = this.$(formId).serializeArray();
      // convert parameters to dictionary
      const paramsDict = {};
      params.forEach((param) => {
        paramsDict[param.name] = param.value;
      });

      let actionEventUpdateData = JSON.parse(JSON.stringify(paramsDict));

      let updatedActionEventData = {
        data:{
          'type':'actionevents',
          attributes:{
            'name': actionEventUpdateData.role,
            'code': actionEventUpdateData.classTypeCode,
            'description': actionEventUpdateData.roleDescription,
          }
        }

      };


      let accessToken = this.appConfiguration.getAccessToken();
      let responseAfterUpdatingActionEvent = this.olmSetupService.updateActionEvent(updatedActionEventData, accessToken, actionEvent.id);

      let context = this;
      responseAfterUpdatingActionEvent.then(function (msg) {
        context.loadData();
        context.get('notifier').success('Action event updated');
      }).catch(function (errorMsg) {
        context.get('notifier').danger('Failed to Update Action Event');
      });

    }
  },

});
