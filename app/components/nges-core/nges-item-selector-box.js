import Component from '@ember/component';
import {computed} from '@ember/object';
import Ember from 'ember';


export default Component.extend({


  init() {
    this._super(...arguments);
  },


  actions: {

    clickData() {
      console.log('message', ' clickData ');
    },

    allSelectedAction() {
      this.toggleProperty('isAllChecked');


      let isAllChecked = this.get('isAllChecked');
      let tableData = this.get('selectBoxDataLists');


      if (tableData.length > 0) {
        if (isAllChecked) {
          this.set('isMultipleChecked', true);

          tableData.forEach(function (item, index, enumerable) {
            Ember.set(item, "selected", true);
          });

        } else {
          this.set('isMultipleChecked', false);
          tableData.forEach(function (item, index, enumerable) {
            Ember.set(item, "selected", false);
          });
        }
      }


    },


    selectedItemAction(item, checked) {

      if (checked) {

        Ember.set(item, "selected", true);


      } else if (!checked) {
        Ember.set(item, "selected", false);
      }


      if (this.get('selectBoxDataLists').length > 1) {
        this.set('isMultipleChecked', true);

      } else {
        this.set('isMultipleChecked', false);
      }
    }
  },


});
