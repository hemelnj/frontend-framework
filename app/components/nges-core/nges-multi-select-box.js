import Component from '@ember/component';

export default Component.extend({


  init() {
    this._super(...arguments);
    // console.log('init-componentData', this.get('componentData') );
  },
  didInsertElement() {
    this._super(...arguments);
    //console.log('element id: ' + this.elementId);

    // render multi select box component
    this.$('#'+ this.get('componentData.itemId') ).fSelect();
  },
  actions: {
    clickMe() {
      console.log('message', this.$('#'+ this.get('componentData.itemId') ).val() );
    }
  }
});


// https://www.jqueryscript.net/form/jQuery-Plugin-For-Filterable-Multiple-Select-with-Checkboxes-fSelect.html
