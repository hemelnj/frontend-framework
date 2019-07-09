import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr("string"),
  age: DS.attr("string"),
  phone: DS.attr("string"),
  description: DS.attr("string"),
});
