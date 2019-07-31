import Component from '@ember/component';
import $ from 'jquery';
import {
  inject as service
} from '@ember/service';

let ATOMIC_RULE_MODEL_NAME = 'nges-engines/rule-engine/atomicrule';

export default Component.extend({


  appConfiguration: service('app-configuration'),
  olmSetupService: service('nges-engines/olm/olm-setup'),

  store: service(),
  name: '',
  id: -1,
  updateModeEnabled: false,
  updateContentIndex: null,
  showValueInput: false,
  dontShowValueInput: true,
  atomicRules: [],
  operations: [],
  classes: [],
  attributes: [],
  selectedValue: '',
  comparedAttributes: [],
  testRules: [],


  actions: {

    save() {
      let context = this;
      let compareClassName = $(".comparedClassName:selected").val();
      let val = "";
      if (compareClassName == 'noObject') {
        val = $("#customComparedValue").val();
      } else {
        val = $(".comparedAttributeName:selected").val();
      }
      let data = {
        "ruleName": $("#name").val(),
        "objectType": $(".className:selected").val(),
        "property": $(".attributeName:selected").val(),
        "operator": $(".operationName:selected").val(),
        "compObjectType": $(".comparedClassName:selected").val(),
        "compProperty": val
      }
      if (this.get('id') != -1) {
        data.id = this.get('id');
        console.log("Data id is : " + data.id);
        let context = this;
        this.get('store').findRecord(ATOMIC_RULE_MODEL_NAME, data.id).then(function (ruleData) {
          console.log("------On updating data--------");
          ruleData.set('ruleName', data.ruleName);
          ruleData.set('objectType', data.objectType);
          ruleData.set('property', data.property);
          ruleData.set('operator', data.operator);
          ruleData.set('compObjectType', data.compObjectType);
          ruleData.set('compProperty', data.compProperty);
          ruleData.save();
          alert("One record updated");
          context.initAlldata();
        });
      } else {
        let newRecord = this.get('store').createRecord(ATOMIC_RULE_MODEL_NAME, data);
        newRecord.save();

        alert("One record added");
        this.initAlldata();
      }

    },
    update(rule) {
      let context = this;
      console.log(rule.id);
      this.set('id', rule.id);
      console.log(rule);
      $("#name").val(rule.ruleName);
      $("#firstClassName").val(rule.objectType);
      let mclass = this.findItemFromArray(this.get('classes'), rule.objectType);
      context.set('attributes', mclass != null ? mclass.properties : null);

      /*$("#attributeName").append($("<option></option>")
        .attr("value", rule.property)
        .text(rule.property));*/

      $("#operationName").val(rule.operator);
      $("#comparedClassName").val(rule.compObjectType);
      if (rule.compObjectType == 'noObject') {
        this.set('showValueInput', false);
        this.set('dontShowValueInput', true);
        $("#customComparedValue").val(rule.compProperty);
      } else {
        this.set('showValueInput', true);
        this.set('dontShowValueInput', false);
        $("#comparedAttributeName").val(rule.compProperty);
        let mclass = context.findItemFromArray(context.get('classes'), rule.compObjectType);
        context.set('comparedAttributes', mclass != null ? mclass.properties : null);
      }


    },

    delete(rule) {
      this.get('store').findRecord(ATOMIC_RULE_MODEL_NAME, rule.id, {reload: true})
        .then(function (atomicrule) {
          atomicrule.destroyRecord();
          alert("One atomic rule is deleted");
        });
    },

    toggleShowValueInput() {
      let val = !this.get('dontShowValueInput');
      this.set('showValueInput', !val);
      this.set('dontShowValueInput', val);
    }
  },
  initAlldata() {
    let context = this;
    this.get('store').findAll(ATOMIC_RULE_MODEL_NAME, {reload: true}).then((data) => {
      context.set('atomicRules', data);
    });


  },
  init() {
    this._super(...arguments);
    let context = this;

    this.initAlldata();

    /* todo: here parameter need to updated base on requirement */

    let cl =[];
    let accessToken = this.appConfiguration.getAccessToken();
    let allCreatedClassTypes = this.olmSetupService.getAllClassType(accessToken);
    allCreatedClassTypes.then(function (msg) {

      for(let i=0;i<msg.data.length;i++) {
        let p = {name:msg.data[i].attributes.displayName, properties: ['id', 'incomeRange', 'risk', 'status']};
        cl.pushObject(p);
      }

    }).catch(function (errorMsg) {
      context.get('notifier').danger('Failed to Load OLM Objects');
    });

    this.set('classes', cl);

    //setting operators value
    let opts = ["==", ">=", "<=", ">", "<"];
    this.set('operations', opts);
  },
  didInsertElement() {
    console.log("Hello world");
    let context = this;
    $('#firstClassName').on('change', function () {
      let itemname = $(".className:selected").val();
      let mclass = context.findItemFromArray(context.get('classes'), itemname);
      context.set('attributes', mclass != null ? mclass.properties : null);
    });

    $("#comparedClassName").on('change', function () {
      let itemname = $(".comparedClassName:selected").val();
      if (itemname == 'noObject') {
        context.set('showValueInput', false);
        context.set('dontShowValueInput', true);
      } else {
        context.set('showValueInput', true);
        context.set('dontShowValueInput', false);
        let mclass = context.findItemFromArray(context.get('classes'), itemname);
        context.set('comparedAttributes', mclass != null ? mclass.properties : null);
      }
    });

  },
  findItemFromArray(array, itemName) {
    for (let c = 0; c < array.length; c++) {
      if (array[c].name == itemName)
        return array[c];
    }
    return null;
  }

});
