let enginePath = 'nges-engines';

export default [

  {
    appCode: 'nges-engine',
    appPanelCode: 'admin-panel',
    appModuleCode: 'common',
    appMenuTemplateCode: 'olm',
    name: 'RMS',
    templatePath: enginePath + '/olm',
    templates: [
      {
        code: 'object-state',
        name: 'object-state',
        label: 'Object State',
        detailPath: '/',
        detailView: []
      },
      {
        code: 'action-event',
        name: 'action-event',
        label: 'Action Event',
        detailPath: '/',
        detailView: []
      },
      {
        code: 'diagram-tool',
        name: 'diagram-tool',
        label: 'Diagram Tool',
        detailPath: '/',
        detailView: []
      },
      {
        code: 'menu-item-to-olm-object-assignment',
        name: 'menu-item-to-olm-object-assignment',
        label: 'Menu Mapping',
        detailPath: '/',
        detailView: []
      },
    ]
  },
  {
    appCode: 'nges-engine',
    appPanelCode: 'admin-panel',
    appModuleCode: 'common',
    appMenuTemplateCode: 'auth-engine',
    name: 'AuthEngine',
    templatePath: enginePath + '/auth-engine',
    templates: [
      {
        code: 'role-creation',
        name: 'component-role',
        label: 'User Roles',
        detailPath: '/',
        detailView: []
      },
      {
        code: 'user-creation',
        name: 'component-user',
        label: 'User Profiles',
        detailPath: '/',
        detailView: []
      },
    ]
  },
  {
    appCode: 'nges-engine',
    appPanelCode: 'admin-panel',
    appModuleCode: 'common',
    appMenuTemplateCode: 'tree-engine',
    name: 'Tree Engine',
    templatePath: enginePath + '/tree-engine',
    templates: [
      {
        code: 'data-context-to-olm-object-assignment',
        name: 'data-context-to-olm-object-assignment',
        label: 'User Functions-Locations',
        detailPath: '/',
        detailView: []
      },
      {
        code: 'tree-engine-registration',
        name: 'registration',
        label: 'User Registration',
        detailPath: '/',
        detailView: []
      },
    ]
  },

  {
    appCode: 'nges-engine',
    appPanelCode: 'admin-panel',
    appModuleCode: 'common',
    appMenuTemplateCode: 'pe',
    name: 'Property Extender',
    templatePath: enginePath + '/property-extender',
    templates: [
      {
        code: 'property-extender',
        name: 'classtype-list',
        label: 'Property Extender',
        detailPath: '/',
        detailView: []
      }
    ]
  }

]
