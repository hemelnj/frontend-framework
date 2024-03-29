import Component from '@ember/component';
import {inject as service} from '@ember/service';


export default Component.extend({

  appConfiguration: service('app-configuration'),
  olmSetupService: service('nges-engines/olm/olm-setup'),

  data: null,
  modeldata: null,

  objectStateFormData: {
    name: '',
    code: '',
    description: '',
  },
  notifier: service(),
  actions: {

    stateNameCheck(value) {

      let stateList = this.get('stateList');

      console.log('message--stateList', stateList);
      let res = stateList.filter(function (el) {
        return (el.name.includes(value));
      });

      if (res[0] !== undefined) {
        if (res[0].name === value) {
          this.set('nameMatchedAlert', true);
          console.log('message-matched', 'matched');

        } else {
          this.set('nameMatchedAlert', false);
          console.log('message-not matched', 'not matched');
        }
      }


    },

    onChangeClassTypes(value) {
      let classType = value;
      this.set('classType', classType);
      this.set('visibleViewButton', true);
      this.dataInit(classType.id);
      this.set('showTable', true);
    },

    getClassTypeKey(searchKeyword) {
      let tmpClassTypeList = this.get('tmpClassTypeList');
      let classTypeList = tmpClassTypeList;
      console.log('message-classTypeList', classTypeList);
      let classTypeListRes = classTypeList.filter(function (el) {
        return (el.name.includes(searchKeyword));
      });

      if (searchKeyword.trim() === '') {
        this.set('classTypeList', tmpClassTypeList);
      } else {
        this.set('classTypeList', classTypeListRes);
      }
    },

    getNewClassType() {

      let stateName = this.get('objectStateFormData.name');
      let stateCode = this.get('objectStateFormData.name').toUpperCase().split(' ').join('_');
      let description = this.get('objectStateFormData.description');
      let classType = this.get('classType');


      console.log('message-objectStateFormData-name', stateName);
      console.log('message-objectStateFormData-code', stateCode);
      console.log('message-objectStateFormData-description', description);
      console.log('message-objectStateFormData-classTypeId', classType.id);


      let classTypeData = {
        "name": classType.name,
        "id": classType.id,
      };


      let stateData = [{
        "mEndEdges": null,
        "name": stateName,
        "id": 1,
        "extra": "1",
        "code": stateCode,
        "classType": classType,
        "crudActionEventMappings": null,
        "createdAt": 1,
        "lastUpdatedBy": "1",
        "lastUpdatedAt": 1,
        "comments": "1",
        "describtion": description,
        "createdBy": "11",
        "startEdges": null
      }];

      console.log('message', stateData);

      let accessToken = this.appConfiguration.getAccessToken();
      let responseAfterAddingState = this.olmSetupService.addNewState(stateData, accessToken);
      let context = this;
      responseAfterAddingState.then(function (msg) {
        if (msg) {
          console.log('responseAfterAddingState', msg);
          context.get('notifier').success('New State Added');
          context.dataInit(classType.id);
        } else {
          context.get('notifier').danger('Failed To Add');
        }
      });


    },

    editState(item) {
      console.log('message-edit State', item);
      this.set('editClick', true);
      this.set('resetClick', false);

      this.set('objectStateFormData', {
        name: item.name,
        code: item.code,
        description: item.describtion,
      });

      console.log('message-objectStateFormData', this.get('objectStateFormData'));

      this.set('state', item);
    },

    refreshPage() {
      this.set('name', '');
      this.set('code', '');
      this.set('description', '');
      this.set('visibleViewButton', false);
      this.init();
    },

    viewTableData() {
      this.set('showTable', true);
    },

    updateState(state) {
      let stateName = this.get('objectStateFormData.name');
      let stateCode = this.get('objectStateFormData.code');
      let description = this.get('objectStateFormData.description');
      let classType = this.get('classType');


      console.log('message-objectStateFormData-name', stateName);
      console.log('message-objectStateFormData-code', stateCode);
      console.log('message-objectStateFormData-description', description);
      console.log('message-objectStateFormData-classTypeId', classType.id);


      let updateData = {
        data: {
          'id': state.id,
          'type': 'states',
          attributes: {
            'name': stateName,
            //'code': stateCode,
            'describtion': description,
          }
        }
      };

      console.log('message--updateData', updateData);

      /*let context = this;
      let accessToken = this.appConfiguration.getAccessToken();
      this.olmSetupService.updateObjectState(updateData, accessToken, state.id).done(function (data) {

        context.get('notifier').success('Update Successfully');
        context.dataInit(selectedClassTypeId);

      }).fail(function (msg) {
        context.get('notifier').danger('Fail to Update');
      });*/

    }
  },
  init() {
    this._super(...arguments);


    let serviceInformation = this.get('serviceInformation');

    console.log('message', serviceInformation);

    this.set('resetClick', true);
    this.set('editClick', false);
    this.set('showTable', false);
    this.classTypeLoad();
  },

  didReceiveAttrs() {
    this._super(...arguments);
    this.set('tmpClassTypeList', this.get('tmpClassTypeList'));
  },

  classTypeLoad() {
    let context = this;
    let accessToken = this.appConfiguration.getAccessToken();
    let allCreatedClassTypes = this.olmSetupService.getAllClassType(accessToken);

    allCreatedClassTypes.then(function (msg) {
      console.log('message-classtypes', msg.data);
      context.set('classtypes', msg.data);
      context.set('tmpClassTypeList', msg.data);
    }).catch(function (errorMsg) {
      context.get('notifier').danger('Failed to Load OLM Objects');
    });

  },

  dataInit(classTypeId) {

    let context = this;
    let accessToken = this.appConfiguration.getAccessToken();
    let classTypeById = this.olmSetupService.getClassTypeById(classTypeId, accessToken);

    classTypeById.then(function (msg) {
      context.set('stateList', msg.data.attributes.states);
    }).catch(function (errorMsg) {
      context.get('notifier').danger('Failed to Load OLM States');
    });
  }

});
