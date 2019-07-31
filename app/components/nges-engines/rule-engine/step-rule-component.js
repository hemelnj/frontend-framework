import Component from '@ember/component';
import $ from 'jquery';
import {
  Diagram
} from './DiagramFiles/Diagram';
import {
  inject as service
} from '@ember/service';


const ATOMIC_RULE_MODEL_NAME = 'nges-engines/rule-engine/atomicrule';
const UNIT_RULE_MODEL_NAME = 'nges-engines/rule-engine/unitrule';
const STEP_RULE_MODEL_NAME = 'nges-engines/rule-engine/steprule';

export default Component.extend({

  id: '',
  stepRuleId:'',
  fieldId: '',
  diagram: '',
  store: service(),
  message: '',
  showPopUp: '',
  showOptFormOnModal: '',
  selectedRule: '',
  selectedOperator: '',
  mousePos: '',
  atomicrules: '',
  operators: '',
  unitRule: '',
  extra: '',
  allStepRules: '',
  finalRuleString: '',
  manualOperators: '',
  diagramView: '',
  isEditView: '',
  isStepRuleEditView: '',
  currentRuleAction: '',
  unitRuleForStepRuleList:'',

  actions: {
    cancel() {
      this.set('showPopUp', false);
    },
    addAnotherField() {
      $(".then-container").append(
        "<input type='text' class='thenfield' style='margin-top:10px' id=then" + this.fieldId + "><br/>"
      );
      this.fieldId = this.fieldId + 1;
    },
    removeLastField() {
      $(".then-container").children().last().remove();
      $(".then-container").children().last().remove();
      this.fieldId = this.fieldId - 1;
    },
    addnewaction() {
      $(".modal-wrapper").fadeIn();
    },
    closenewaction() {
      $(".modal-wrapper").fadeOut();
    },
    edit(i) {
      this.set('id', i.id);
      console.log("Hey the id is " + i.id);
      $("#nameofrule").val(i.name);
      $("#priority").val(i.salience);
      $("#then").val(i.extra);
      this.set('isEditView', true);

      if(i.extra!="") {
        let action = i.extra.split("##@@");
        let actionList = [];
        for (let j = 0; j < action.length; j++) {
          actionList.push(action[j]);
        }

        this.set('actionList',actionList);
        console.log('message---heyyyyy', actionList);
      }


      this.drawDiagramOnEdit(i.rule);
      console.log("in edit ......."+i.rule);
      this.changeData(this.diagram.generateDataToSave());

    },
    update() {

      let finalRule = this.get('unitRule');

      let str = this.arrayToString(finalRule);
      let id = this.get('id');

      let then = ""
      for (var c = 0; c < $(".then-action").length; c++) {
        if (c == $(".then-action").length - 1) {
          console.log(then + "a")
          then = then + $(".then-action").eq(c).html();
          console.log(then + "a1")
        } else {
          console.log(then + "a2")
          then = then + $(".then-action").eq(c).html() + "##@@";
          console.log(then + "a3")
        }

      }


      let data = {
        name: $("#nameofrule").val(),
        rule: str,
        extra: then,
        salience: $("#priority").val(),
        id: id,
      }


      for(let i=0; i<this.get('unitRuleForStepRuleList').length; i++ ){
          if(this.get('unitRuleForStepRuleList')[i].id==id){
            this.get('unitRuleForStepRuleList').splice(i, 1);
            this.get('unitRuleForStepRuleList').pushObject(data);

          }


      }

      alert("One record is updated");

      this.get('diagram').clearAll();
      this.$('#nameofrule').val("");
      this.$('#priority').val("");
      $(".action-list-container").empty();
      this.set('isEditView',false);




    },
    delete(rule){

      let temp = [];

      let unitRuleForStepRuleList = this.get('unitRuleForStepRuleList');

      for(let i=0; i < unitRuleForStepRuleList.length; i++ ){
        if(unitRuleForStepRuleList[i].id === rule.id) {
          continue;
        }
        temp.push(unitRuleForStepRuleList[i])
      }

      this.set('unitRuleForStepRuleList', temp);
    },

    deleteStepRule(rule){
      this.get('store').findRecord(STEP_RULE_MODEL_NAME, rule.id,{reload : true}).then(function (stepRule) {
        stepRule.destroyRecord();
        alert("One step rule is deleted");

      });

    },

    editStepRule(rule){
      this.set('stepRuleId',rule.id);
      this.set('isStepRuleEditView',true);
      this.set('unitRuleForStepRuleList',rule.unitRuleList);
      this.$("#nameOfStepRule").val(rule.name);

    },
    save() {

      let array = this.get('unitRule');
      console.log("here......"+array);
      let str = "";
      for (let i = 0; i < array.length; i++) {
        if (array[i].ruleName) {
          str = str + " " + array[i].ruleName;
        } else {
          str = str + " " + array[i];
        }
      }
      str = str.substring(1, str.length);

      let then = ""
      for (var c = 0; c < $(".then-action").length; c++) {
        if (c == $(".then-action").length - 1) {
          console.log(then + "a")
          then = then + $(".then-action").eq(c).html();
          console.log(then + "a1")
        } else {
          console.log(then + "a2")
          then = then + $(".then-action").eq(c).html() + "##@@";
          console.log(then + "a3")
        }



      }
      //then = then.substring(0, then.length - 4);


      let data = {

        name: $("#nameofrule").val(),
        salience:$("#priority").val(),
        rule: str,
        extra: then,
      }

      this.get('unitRuleForStepRuleList').pushObject(data);


      /*let newRecord = this.get('store').createRecord('unitrule', data);
      newRecord.save();
      console.log("Here I am on new record ");
      console.log(newRecord);*/
      alert("One record added");
     // this.initLoadData();
      this.get('diagram').clearAll();
      this.$('#nameofrule').val("");
      this.$('#priority').val("");
      $(".action-list-container").empty();

    },
    saveStepRule() {

      let context= this;

      let data = {

        name: $("#nameOfStepRule").val(),
        unitRuleList: this.get('unitRuleForStepRuleList')

      };
      console.log("here.....................in step rule" + this.get('unitRuleForStepRuleList'))
      let newRecord = this.get('store').createRecord(STEP_RULE_MODEL_NAME, data);
      newRecord.save();
      alert("One step rule added");
      this.set('unitRuleForStepRuleList',[]);
      this.$('#nameOfStepRule').val("");


    },
    updateStepRule() {

      let context= this;

      let data = {

        name: $("#nameOfStepRule").val(),
        unitRuleList: this.get('unitRuleForStepRuleList')

      };
      console.log("here.....................in step rule" + this.get('unitRuleForStepRuleList'))
      this.get('store').findRecord(STEP_RULE_MODEL_NAME,this.get('stepRuleId')).then(function (oldStepRule) {
        oldStepRule.set('name', data.name);
        oldStepRule.set('unitRuleList', data.unitRuleList);
        oldStepRule.save();

      });
      alert("One step rule updated");
      this.set('unitRuleForStepRuleList',[]);
      this.$('#nameOfStepRule').val("");
      this.set('isStepRuleEditView',false);

    }


  },













  init() {
    this._super(...arguments);
    this.fieldId = 2;
    this.set('isEditView', false);
    this.diagram = new Diagram(Konva, this);
    this.operators = ["&&", "||"];
    this.atomicrules = [];
    this.unitRule = [];
    this.setDiagramViewTrue();
    this.manualOperators = ["(", "&&", "||", ")"];
    let singleRule = {
      ruleName: 'RandomName',
      objectType: 'someObject',
      property: 'someProperty',
      operator: '>=',
      compObjectType: 'noObject',
      compProperty: '10'
    };
    let singleRule2 = {
      ruleName: 'RandomName2',
      objectType: 'someObject',
      property: 'someProperty',
      operator: '>=',
      compObjectType: 'someSecondObject',
      compProperty: '15'
    };
    //this.atomicrules.push(singleRule);
    //this.atomicrules.push(singleRule2);
    //  console.log(this.atomicrules);
    this.set('showPopUp', false);
    this.set('showOptFormOnModal', false);
    this.set('unitRuleForStepRuleList', []);
    this.set('allStepRules',[]);
    this.initLoadData();
  },
  initLoadData() {
    let atomic_rule_properties = ['objectType', 'compObjectType', 'compProperty',
      'operator', 'ruleName', 'ruleNumber', 'property', 'id'
    ];
    let my_data = [];
    let context = this;
    this.get('store').findAll(ATOMIC_RULE_MODEL_NAME).then((data) => {
      for (let c = 0; c < data.length; c++) {
        my_data.push(data.toArray()[c].getProperties(atomic_rule_properties));
      }
      this.set('atomicrules', my_data);

    });
    this.store.findAll(STEP_RULE_MODEL_NAME)
      .then(function (steprules) {
        context.set('allStepRules', steprules)
      });
  },
  didInsertElement() {
    console.log("here setting diagram Instance");
    this.diagram.diagramInit();
    this.diagram.setViewInstance(this);
    let context = this;
    $(".tools").click(function() {
      let clickedItem = this.id;
      if (clickedItem == "clear") {
        context.diagram.clearAll();
      } else {
        $("div").removeClass("active-tool");
        $(this).addClass("active-tool");
        context.diagram.setBtnKey(clickedItem);
      }
    });
    $("#addAtomicRuleTOList").click(function() {
      console.log("Here add rule is called");
      let ruleName = $(".atomicrulesFormView:selected").val();
      //add that to the list
      context.addAtomicRuleTOList(ruleName)
    });
    $("#addOptToList").click(function() {
      console.log("Here add opt is called");
      let opt = $(".operatorsFormView:selected").val();
      context.addOptToList(opt);
    });
    $("#remove").click(function() {
      context.remove();
    });
    $("#showDiagram").click(function() {
      context.set('diagramView', !context.get('diagramView'));
      context.triggerDrawDiagramOnCanvas();
    });
    $("#submit-new-action").click(function() {
      $(".modal-wrapper").fadeOut();
      let className = $(".action-class-name:selected").val();
      let propertyName = $(".action-property-name:selected").val();
      let propertyValue = $("#action-property-value").val();
      let action = className + " " + propertyName + " " + propertyValue;
      $(".action-list-container").append("<div><div class='then-action action-context'>" + action + "</div><div>");
      $(".then-action").off();
      $(".then-action").click(function() {

        $(".popup-for-delete-wrapper").fadeIn();
        context.currentRuleAction = $(this);
      });
    })
    $("#delete-yes").click(function() {
      context.currentRuleAction.remove();
      $(".popup-for-delete-wrapper").fadeOut();
    })
    $("#delete-no").click(function() {
      $(".popup-for-delete-wrapper").fadeOut();
    })
  },
  didRender() {
    let context = this;
    $(".operatorSubmitBtn").click(function() {
      let opt = $(".operators:selected").val();
      context.drawOperatorInDiagram(context.mousePos, opt);
    });
    $(".atomicRuleSubmitBtn").click(function() {
      let selectedRule = $(".atomicrules:selected").val();
      let rule = context.findRuleByName(selectedRule);
      context.drawAtomicRuleInDiagram(rule);
    });



  },

  setDiagramViewFalse() {
    this.set('diagramView', false);
  },
  setDiagramViewTrue() {
    this.set('diagramView', true);
  },
  setShowPopUpTrue() {
    this.set('showPopUp', true);
  },
  setShowPopUpFalse() {
    this.set('showPopUp', false);
  },
  setShowOptFormOnModalTrue() {
    this.set('showOptFormOnModal', true);
  },
  setShowOptFormOnModalFalse() {
    this.set('showOptFormOnModal', false);
  },
  changeData(d) {
    console.log("Here.............. in change datadgdgdgd"+d)
    this.set('unitRule', this.getRuleFromStringByName(d));
    this.set('finalRuleString', this.getStringFromRuleArray(this.get('unitRule')));
  },
  getStringFromRuleArray(array) {
    console.log("the givern array is ");
    console.log(array);
    console.log(array.length);
    let s = "";
    for (let c = 0; c < array.length; c++) {
      console.log("c is :" + c + "-->" + array[c]);
      if (this.isUndefined(array[c].ruleName)) {
        s = s + " " + array[c];
      } else {
        s = s + " " + array[c].objectType + " " + array[c].property + " " + array[c].operator;
        if (array[c].compObjectType != 'noObject') {
          s = s + " " + array[c].compObjectType;
        }
        s = s + " " + array[c].compProperty;
      }
    }
    console.log("S is : " + s);
    return s;
  },
  getRuleFromStringByName(token) {
    if (this.isUndefined(token)) {
      return;
    }
    let arr1 = token.split(" ");
    let arr = [];
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i].length > 5) {
        let t = arr1[i];
        arr.push(this.findRuleByName(t));
      } else {
        arr.push(arr1[i]);
      }
    }
    return arr;
  },
  isUndefined(t) {
    if (typeof t === "undefined") {
      return true;
    } else {
      return false;
    }
  },
  findRuleFromNumber(number) {
    let rf_atomicRules = this.get('atomicrules');
    for (let c = 0; c < rf_atomicRules.length; c++) {
      if (rf_atomicRules[c].ruleNumber == number) {
        return rf_atomicRules[c];
      }
    }
  },
  findRuleFromName(name) {
    let rf_atomicRules = this.get('atomicrules');
    for (let c = 0; c < rf_atomicRules.length; c++) {
      if (rf_atomicRules[c].ruleName == name) {
        return rf_atomicRules[c];
      }
    }
  },
  getRuleFromString(token) {
    if (this.isUndefined(token)) {
      return;
    }
    let arr1 = token.split(" ");
    console.log("Token is " + token);
    console.log(arr1);
    let arr = [];
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i].length >= 5) {
        let t = arr1[i];
        console.log(t);
        arr.push(this.findRuleFromName(t));

      } else {
        arr.push(arr1[i]);
      }
    }
    console.log("My arra 1");
    console.log(arr);
    return arr;
  },
  findRuleByName(token) {


    for (let c = 0; c < this.atomicrules.length; c++) {
      let l = this.atomicrules[c];
      if (token == l.ruleName) {

        let temp = {
          ruleName: l.ruleName,
          objectType: l.objectType,
          property: l.property,
          operator: l.operator,
          compObjectType: l.compObjectType,
          compProperty: l.compProperty,
        };
        console.log(temp);
        return temp;
      }
    }
    return null;

  },
  drawOperatorInDiagram(mousePos, selectedOperator) {
    if (this.diagram.getBtnKey() == 'opt') {
      this.diagram.drawOperator(mousePos, selectedOperator);
      this.setShowPopUpFalse();
    } else if (this.diagram.getBtnKey() == 'modify') {
      this.diagram.modifyOperator(selectedOperator);
      this.setShowPopUpFalse();
    }
    //console.log("Triggered---");
    this.changeData(this.diagram.generateDataToSave());
    //console.log("Triggered----");
  },
  drawAtomicRuleInDiagram(rule) {
    console.log(rule);
    if (this.diagram.getBtnKey() == 'modify') {
      this.diagram.modifyAtomicRule(rule);
      this.setShowPopUpFalse();
    } else if (this.diagram.getBtnKey() == 'ar') {
      this.diagram.drawAtomicRule(this.mousePos, rule);
      this.setShowPopUpFalse();

    }
    this.changeData(this.diagram.generateDataToSave());
  },
  addOptToList(token) {
    this.unitRule.push(token);
    this.set('finalRuleString', this.getStringFromRuleArray(this.get('unitRule')));
  },
  addAtomicRuleTOList(ruleName) {

    let arr = this.get('unitRule');
    console.log("here------ In add atomic Rule To List")
    arr.push(this.findRuleByName(ruleName));

    this.set('unitRule', arr);
    console.log("arry is array");
    console.log(arr);
    this.set('finalRuleString', this.getStringFromRuleArray(this.get('unitRule')));
    console.log(this.get('unitRule'));
  },
  remove() {
    this.unitRule.pop();
    this.set('finalRuleString', this.getStringFromRuleArray(this.get('unitRule')));
  },
  arrayToString(array) {
    let str = "";
    for (let i = 0; i < array.length; i++) {
      if (array[i].ruleName) {
        str = str + " " + array[i].ruleName;
      } else {
        str = str + " " + array[i];
      }

    }
    return str.substring(1, str.length);
  },
  triggerDrawDiagramOnCanvas() {
    console.log("triggering draw diagram on canvas");
    this.diagram.clearAll();
    this.diagram.setRuleString(this.arrayToString(this.get('unitRule')));
    this.diagram.generateDataFromString("");
  },
  drawDiagramOnEdit(s) {
    console.log("triggering draw diagram on canvas");
    this.diagram.clearAll();
    this.diagram.setRuleString(s);
    this.diagram.generateDataFromString("");
  }
});
