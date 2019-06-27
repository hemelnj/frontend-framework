let servicePath = 'nges-services';

export default [


  {
    appCode: 'rms',
    appPanelCode: 'operation',
    appModuleCode: 'collection',
    appMenuTemplateCode: 'remitters',
    name: 'Remitters',//display name only
    templatePath: servicePath + '/rms',
    templates: [
      {
        code: 'remitter-reg',
        name: 'remitter-registration',
        label: 'Remitter Registration',
        detailPath: '/remitter',
        detailView: [
          {
            code: 'create-remitter',
            name: 'create-remitter',
            label: 'create Remitter',
          },
          {
            code: 'edit-remitter',
            name: 'edit-remitter',
            label: 'edit Remitter',
          }
        ]
      },
      {
        code: 'remittance-collection',
        name: 'remittance-collection-transaction',
        label: 'Remittance Collection Transaction',
        detailPath: '/',
        detailView: []
      },
    ]
  },





]
