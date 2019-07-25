import DS from 'ember-data';

export default DS.Model.extend({

  rule: DS.attr("string"),
  name: DS.attr("string"),
  ruleId: DS.attr("string"),
  extra: DS.attr("string"),

});
