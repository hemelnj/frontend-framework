let enginePath = 'nges-engines';

export default [

  {
    appCode: 'rms',
    appPanelCode: 'admin-panel',
    appModuleCode: 'common',
    appMenuTemplateCode: 'olm',
    name: 'RMS',
    templatePath: enginePath + '/olm',
    templates: [
      {
        code: 'object-state',
        name: 'object-state',
        viewName: 'Object State',
        detailPath: '/',
        detailView: []
      },
      {
        code: 'action-event',
        name: 'action-event',
        viewName: 'Action Event',
        detailPath: '/',
        detailView: []
      },
      {
        code: 'diagram-tool',
        name: 'diagram-tool',
        viewName: 'Diagram Tool',
        detailPath: '/',
        detailView: []
      },
      {
        code: 'menu-item-to-olm-object-assignment',
        name: 'menu-item-to-olm-object-assignment',
        viewName: 'Menu Mapping',
        detailPath: '/',
        detailView: []
      },
    ]
  },
  {
    appCode: 'rms',
    appPanelCode: 'admin-panel',
    appModuleCode: 'common',
    appMenuTemplateCode: 'auth-engine',
    name: 'AuthEngine',
    templatePath: enginePath + '/auth-engine',
    templates: [
      {
        code: 'role-creation',
        name: 'component-role',
        viewName: 'User Roles',
        detailPath: '/',
        detailView: []
      },
      {
        code: 'user-creation',
        name: 'component-user',
        viewName: 'User Profiles',
        detailPath: '/',
        detailView: []
      },
    ]
  },
  {
    appCode: 'rms',
    appPanelCode: 'admin-panel',
    appModuleCode: 'common',
    appMenuTemplateCode: 'tree-engine',
    name: 'Tree Engine',
    templatePath: enginePath + '/tree-engine',
    templates: [
      {
        code: 'data-context-to-olm-object-assignment',
        name: 'data-context-to-olm-object-assignment',
        viewName: 'User Functions-Locations',
        detailPath: '/',
        detailView: []
      },
      {
        code: 'tree-engine-registration',
        name: 'registration',
        viewName: 'User Registration',
        detailPath: '/',
        detailView: []
      },
    ]
  },

  {
    appCode: 'rms',
    appPanelCode: 'admin-panel',
    appModuleCode: 'common',
    appMenuTemplateCode: 'pe',
    name: 'Property Extender',
    templatePath: enginePath + '/property-extender',
    templates: [
      {
        code: 'property-extender',
        name: 'classtype-list',
        viewName: 'Property Extender',
        detailPath: '/',
        detailView: []
      }
    ]
  }

]


// working with development mod
