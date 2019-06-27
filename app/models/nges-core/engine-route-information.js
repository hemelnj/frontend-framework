import DS from 'ember-data';

export default DS.Model.extend({
  appCode: DS.attr('string'),
  appPanelCode: DS.attr('string'),
  appModuleCode: DS.attr('string'),
  appServiceHolderCode: DS.attr('string'),
  appMenuTemplateCode: DS.attr('string'),
  appSubmenuTemplateCode: DS.attr('string'),
  appTemplateDetailCode: DS.attr('string')
});
