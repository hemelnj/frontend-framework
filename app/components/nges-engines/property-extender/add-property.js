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

  didRender() {
    this._super(...arguments);
    let additionalProperty = this.get('attributeList');
    this.createModel(additionalProperty);
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

    context.appWelcome.createDynamicModel(modelName, tableColumns);
    let modelReference = this.store.getReference(modelName, 1);
    context.set('model', modelReference);

  }

})
