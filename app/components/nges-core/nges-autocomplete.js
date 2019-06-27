import Component from '@ember/component';

export default Component.extend({


  actions: {

    getSelectedItem(data) {
      data = data == null ? {} : JSON.parse(data);
      this.set('autocompleteSelectedData', data);

      this.autocompleteOnSelect(data);
    }
  },

  init() {
    this._super(...arguments);

    this.set('autocompleteSelectedData', null);
    //this.set('dataList', );
  },


  didInsertElement() {
    this._super(...arguments);

    let dataList = this.get('dataList');
    let context = this;

    $(document).ready(function() {
      $(".js-select2").select2();
      $(".js-select2-multi").select2();

      $(".large").select2({
        dropdownCssClass: "big-drop",
      });
    });

  },


});

