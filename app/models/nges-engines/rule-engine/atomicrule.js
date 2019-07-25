import DS from 'ember-data';

export default DS.Model.extend({
  objectType: DS.attr("string"),
  compProperty: DS.attr("string"),
  operator: DS.attr("string"),
  ruleName: DS.attr("string"),
  property: DS.attr("string"),
  ruleNumber: DS.attr("string"),
  compObjectType: DS.attr("string"),

});