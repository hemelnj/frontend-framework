import Component from '@ember/component';
import $ from "jquery";
import {formatJSON} from "./ngfs-ui-helpers";


export default Component.extend({


  init() {
    this._super(...arguments);

    this.set('dualBoxConfig', {
      'addButton': '>',
      'addAllButton': '>>',
      'removeButton': '<',
      'removeAllButton': '<<',
    })

  },
  didReceiveAttrs() {
    this._super(...arguments);
  },

  actions: {
    addClick() {
      let selectedRowData = $('.available select').val();
      let selectedItems = formatJSON(selectedRowData);

      let selectedTemp = this.get('dualBoxData.selected').concat(selectedItems);

      this.set('dualBoxData.selected', selectedTemp);
      console.log('message--addClick', this.get('dualBoxData.selected'));
      let available = this.get('dualBoxData.available');
      available = available.filter(function (v) {
        for (let i = 0, len = selectedItems.length; i < len; i++) {
          if (selectedItems[i].id !== v.id) {
            continue;
          }
          return false;
        }
        return true;
      });

      //console.log('message', available);

      this.set('dualBoxData.available', available);

    },
    removeClick() {

      let selectedRowData = $('.selected select').val();
      let selectedItems = formatJSON(selectedRowData);

      let temp = this.get('dualBoxData.available').concat(
        selectedItems
      );
      this.set('dualBoxData.available', temp);

      let selected = this.get('dualBoxData.selected');
      selected = selected.filter(function (v) {
        for (let i = 0, len = selectedItems.length; i < len; i++) {
          if (selectedItems[i].id !== v.id) {
            continue;
          }
          return false;
        }
        return true;
      });

      //console.log('message', selected);
      this.set('dualBoxData.selected', selected);
    },
    addAllClick() {

      let available = this.get('dualBoxData.available');

      let temp = available.concat(
        this.get('dualBoxData.selected')
      );

      if (available !== []) {
        this.set('dualBoxData.selected', temp);
        this.set('dualBoxData.available', []);
      }

    },
    removeAllClick() {

      let temp = this.get('dualBoxData.available').concat(
        this.get('dualBoxData.selected')
      );

      this.set('dualBoxData.available', temp);
      this.set('dualBoxData.selected', []);

    },
    availableOnChange(values) {
    },
    removeOnChange(values) {
    },
    getDualBoxValue() {
      console.log('message', this.get('dualBoxData.selected'));
    },
  }


});
