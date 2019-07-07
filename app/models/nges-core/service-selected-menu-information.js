import DS from 'ember-data';

export default DS.Model.extend({
  serviceId: DS.attr('string'),
  serviceCode: DS.attr('string'),
  serviceName: DS.attr('string'),
});
