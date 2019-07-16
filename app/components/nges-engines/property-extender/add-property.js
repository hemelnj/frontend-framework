import Component from '@ember/component';
import DS from 'ember-data';
import {inject as service} from '@ember/service';

export default Component.extend({

  store: service(),
  appConfiguration: service('app-configuration'),
  peSetupService: service('nges-engines/property-extender/pe-setup'),
  appWelcome: service('nges-core/app-welcome'),
  notifier: service(),

  init() {
    this._super(...arguments);
  },

  didReceiveAttrs() {
    this._super(...arguments);

    let additionalProperty = this.get('attributeList');
    //this.set('attributes', additionalProperty);

    this.createModel(additionalProperty);
    //console.log('message--additionalProperty', additionalProperty);
  },

  createModel(additionalProperty) {
    let context = this;
    let modelName = 'nges-engines/property-extender/additional-property';         // model name base on adapter configuration
    let tableColumns = {};
    let tableHeaders = additionalProperty;                          // this changes with endpoint
    tableHeaders = tableHeaders.result;                          // this changes with endpoint



    // make ember model base on attributes
    for (let i = 0; i < tableHeaders.length; i++) {

      if (tableHeaders[i].type === 'String' || tableHeaders[i].type === 'Varchar') {
        tableColumns[tableHeaders[i].code] = DS.attr('string');
      } else if (tableHeaders[i].type === 'Number' || tableHeaders[i].type === 'Integer') {
        tableColumns[tableHeaders[i].code] = DS.attr('number');
      }
    }

    console.log('message--tableColumns', tableColumns);

    context.appWelcome.createDynamicModel(modelName, tableColumns);
    context.set('model', modelName);
  },

  actions: {

    addAction() {

      let attributes = this.get('attributes');
      console.log('message--attributes', attributes.result);


      let res = this.store.peekAll('nges-engines/property-extender/additional-property');
      console.log('message--res', res);


      let context = this;

      for (let i = 0; i < attributes.result.length; i++) {

        if(attributes.result[i].type === "String"){
          let value = context.peFormData.string;
          context.set('value',value);
        }
        if(attributes.result[i].type === "Integer"){
          let value = context.peFormData.integer;
          context.set('value',value);
        }
        if(attributes.result[i].type === "Varchar"){
          let value = context.peFormData.varchar;
          context.set('value',value);
        }
        let record = {
          id: attributes.result[i].id,
          type: attributes.result[i].type,
          instanceId: attributes.result[i].id,
          value: context.get('value'),
          code: 'n/a',
          describtion: 'n/a',
          createdBy: 'msi',
          createdAt: 1,
          lastUpdatedAt: 1,
          lastUpdatedBy: 'msi',
          comments: 'n/a',
          extra: 'n/a',
          name: "n/a",
          attribute: {
            id: attributes.result[i].id,
          }
        };

        context.get('attributePayload').pushObject(record);
      }

      let payload = this.get('attributePayload');
      console.log('message', payload);

      /*let accessToken = this.appConfiguration.getAccessToken();
      let responseAfterAddingState = this.peSetupService.addNewPropertyData(accessToken,payload);

      responseAfterAddingState.then(function (msg) {
        if (msg) {
          console.log('responseAfterAddingState', msg);
          context.get('notifier').success('New State Added');
          context.set('attributePayload', []);
        } else {
          context.get('notifier').danger('Failed To Add');
          context.set('attributePayload', []);
        }
      });*/

    }
  }

})
