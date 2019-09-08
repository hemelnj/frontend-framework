let servicePath = 'nges-services';

export default [

  {
    appCode: 'rmscore',
    appPanelCode: 'operation',
    appModuleCode: 'disbursement',
    appMenuTemplateCode: 'remittanceTransactions',
    name: 'Collection',
    templatePath: servicePath + '/rmscore',
    templates: [
      {
        code: 'remittance-collection',
        name: 'transaction-collection',
        label: 'Transaction Collection',
        detailPath: '/remitance-transaction',
        detailView: [
          {
            code: 'create-collection',
            name: 'remittance-collection-transaction',
            label: 'Transaction Collection',
          }
        ],
      }
    ]
  },

  {
    appCode: 'rmscore',
    appPanelCode: 'operation',
    appModuleCode: 'disbursement',
    appMenuTemplateCode: 'coverfundtransactions',
    name: 'Cover Fund Transaction',
    templatePath: servicePath + '/rmscore',
    templates: [
      {
        code: 'coverfundtransaction',
        name: 'cover-fund-transaction',
        label: 'Cover Fund Transaction',
        detailPath: '/cover-fund-transaction',
        detailView: [
          {
            code: 'create-cover-fund-transaction',
            name: 'create-cover-fund-transaction',
            label: 'Cover Fund Transaction',
          }
        ],
      }
    ]
  },

  // admin


  {
    appCode: 'rms',
    appPanelCode: 'admin-panel',
    appModuleCode: 'common',
    appMenuTemplateCode: 'countries',
    name: 'Country',
    templatePath: servicePath + '/rms/admin',
    templates: [
      {
        code: 'country-reg',
        name: 'country-reg',
        label: 'Country Registration',
        detailPath: '/country',
        detailView: [
          {
            code: 'create-country',
            name: 'create-country',
            label: 'Country',
          }
        ]
      },
    ]
  },
  {
    appCode: 'rms',
    appPanelCode: 'admin-panel',
    appModuleCode: 'common',
    appMenuTemplateCode: 'currencies',
    name: 'Currency',
    templatePath: servicePath + '/rms/admin',
    templates: [
      {
        code: 'currency',
        name: 'currency',
        label: 'Currency Information',
        detailPath: '/currency',
        detailView: [
          {
            code: 'create-currency',
            name: 'create-currency',
            label: 'Currency',
          }
        ]
      }
    ]
  },
  {
    appCode: 'rms',
    appPanelCode: 'admin-panel',
    appModuleCode: 'common',
    appMenuTemplateCode: 'banks',
    name: 'Bank',
    templatePath: servicePath + '/rms/admin',
    templates: [
      {
        code: 'bank',
        name: 'bank',
        label: 'Bank Information',
        detailPath: '/bank',
        detailView: [
          {
            code: 'create-bank',
            name: 'create-bank',
            label: 'Bank',
          }
        ]
      }
    ]
  },
  {
    appCode: 'rms',
    appPanelCode: 'admin-panel',
    appModuleCode: 'other',
    appMenuTemplateCode: 'deliveryAgents',
    name: 'Delivery Agents',
    templatePath: servicePath + '/rms/admin',
    templates: [
      {
        code: 'deliveryAgents',
        name: 'delivery-agent',
        label: 'Delivery Agents',
        detailPath: '/',
        detailView: []
      },
      {
        code: 'fundSource',
        name: 'fundSource',
        label: 'Source of Fund',
        detailPath: '/',
        detailView: []
      }
    ]
  },
  {
    appCode: 'rms',
    appPanelCode: 'admin-panel',
    appModuleCode: 'collection',
    appMenuTemplateCode: 'fundSources',
    name: 'FundSource',
    templatePath: servicePath + '/rms/admin',
    templates: [
      {
        code: 'fundSource',
        name: 'fund-source',
        label: 'Source of Fund',
        detailPath: '/fund-source',
        detailView: [
          {
            code: 'create-fund-source',
            name: 'create-fund-source',
            label: 'Source of Fund',
          }
        ]
      }
    ]
  },
  {
    appCode: 'rms',
    appPanelCode: 'admin-panel',
    appModuleCode: 'collection',
    appMenuTemplateCode: 'paymentModes',
    name: 'paymentModes',
    templatePath: servicePath + '/rms/admin',
    templates: [
      {
        code: 'paymentModes',
        name: 'payment-mode',
        label: 'Mode of Payment',
        detailPath: '/payment-mode',
        detailView: [
          {
            code: 'create-payment-mode',
            name: 'create-payment-mode',
            label: 'Mode of Payment',
          }
        ]
      }
    ]
  },
  {
    appCode: 'rms',
    appPanelCode: 'admin-panel',
    appModuleCode: 'collection',
    appMenuTemplateCode: 'photoIdTypes',
    name: 'photoIdTypes',
    templatePath: servicePath + '/rms/admin',
    templates: [
      {
        code: 'photoIdTypes',
        name: 'photoid-type',
        label: 'Type of Photo ID',
        detailPath: '/photoid-type',
        detailView: [
          {
            code: 'create-photoid',
            name: 'create-photoid',
            label: 'Type of Photo ID',
          }
        ]
      }
    ]
  },
  {
    appCode: 'rms',
    appPanelCode: 'admin-panel',
    appModuleCode: 'collection',
    appMenuTemplateCode: 'remittancePurposes',
    name: 'remittancePurposes',
    templatePath: servicePath + '/rms/admin',
    templates: [
      {
        code: 'remittancePurposes',
        name: 'remittance-purpose',
        label: 'Purpose of Remittance',
        detailPath: '/remittance-purpose',
        detailView: [
          {
            code: 'create-remittance-purpose',
            name: 'create-remittance-purpose',
            label: 'Purpose of Remittance',
          }
        ]
      }
    ]
  },
  {
    appCode: 'rms',
    appPanelCode: 'admin-panel',
    appModuleCode: 'collection',
    appMenuTemplateCode: 'remittanceTypes',
    name: 'remittanceTypes',
    templatePath: servicePath + '/rms/admin',
    templates: [
      {
        code: 'remittanceTypes',
        name: 'remittance-type',
        label: 'Type of Remittance',
        detailPath: '/remittance-type',
        detailView: [
          {
            code: 'create-remittance-type',
            name: 'create-remittance-type',
            label: 'Create Remittance Type',
          }
        ]
      }
    ]
  },
  {
    appCode: 'rms',
    appPanelCode: 'admin-panel',
    appModuleCode: 'collection',
    appMenuTemplateCode: 'remitterTypes',
    name: 'remitterTypes',
    templatePath: servicePath + '/rms/admin',
    templates: [
      {
        code: 'remitterTypes',
        name: 'remitter-type',
        label: 'Type of Remitter',
        detailPath: '/remitter-type',
        detailView: [
          {
            code: 'create-remitter-type',
            name: 'create-remitter-type',
            label: 'Type of Remitter',
          }
        ]
      }
    ]
  },

  {
    appCode: 'rms',
    appPanelCode: 'admin-panel',
    appModuleCode: 'common',
    appMenuTemplateCode: 'states',
    name: 'states',
    templatePath: servicePath + '/rms/admin',
    templates: [
      {
        code: 'stateInformation',
        name: 'state-information',
        label: 'State/District Information',
        detailPath: '/country-state',
        detailView: [
          {
            code: 'create-state',
            name: 'create-state',
            label: 'State',
          }
        ]
      }
    ]
  },

  {
    appCode: 'rms',
    appPanelCode: 'admin-panel',
    appModuleCode: 'common',
    appMenuTemplateCode: 'exchangeRates',
    name: 'exchangeRates',
    templatePath: servicePath + '/rms/admin',
    templates: [
      {
        code: 'exchangeRates',
        name: 'exchange-rates',
        label: 'Exchange Rate',
        detailPath: '/exchange-rate',
        detailView: [
          {
            code: 'create-exchange-rate',
            name: 'create-exchange-rate',
            label: 'Create Exchange Rates',
          }
        ]
      }
    ]
  },
  {
    appCode: 'rms',
    appPanelCode: 'admin-panel',
    appModuleCode: 'common',
    appMenuTemplateCode: 'branches',
    name: 'branches',
    templatePath: servicePath + '/rms/admin',
    templates: [
      {
        code: 'branchInformation',
        name: 'branch-Information',
        label: 'Branch Information',
        detailPath: '/bank-branch',
        detailView: [
          {
            code: 'create-branch',
            name: 'create-branch',
            label: 'Branch Information',
          }
        ]
      }
    ]
  },
  {
    appCode: 'rms',
    appPanelCode: 'admin-panel',
    appModuleCode: 'collection',
    appMenuTemplateCode: 'exchangeCompanies',
    name: 'exchangeCompanies',
    templatePath: servicePath + '/rms/admin',
    templates: [
      {
        code: 'exchangeCompany',
        name: 'exchange-company',
        label: 'Exchange Company',
        detailPath: '/exchange-company',
        detailView: [
          {
            code: 'create-exchange-company',
            name: 'create-exchange-company',
            label: 'Exchange Company',
          }
        ]
      }
    ]
  },
  {
    appCode: 'rms',
    appPanelCode: 'admin-panel',
    appModuleCode: 'collection',
    appMenuTemplateCode: 'deliveryAgents',
    name: 'deliveryAgents',
    templatePath: servicePath + '/rms/admin',
    templates: [
      {
        code: 'deliveryAgents',
        name: 'delivery-agent',
        label: 'Delivery Agents',
        detailPath: '/delivery-agent',
        detailView: [
          {
            code: 'create-delivery-agent',
            name: 'create-delivery-agent',
            label: 'Delivery Agents',
          }
        ]
      }
    ]
  },
  {
    appCode: 'rms',
    appPanelCode: 'admin-panel',
    appModuleCode: 'collection',
    appMenuTemplateCode: 'deliverySubAgents',
    name: 'deliverySubAgents',
    templatePath: servicePath + '/rms/admin',
    templates: [
      {
        code: 'deliverySubAgents',
        name: 'delivery-sub-agent',
        label: 'Delivery Sub-Agents',
        detailPath: '/delivery-sub-agent',
        detailView: [
          {
            code: 'create-delivery-sub-agent',
            name: 'create-delivery-sub-agent',
            label: 'Delivery Sub-Agents',
          }
        ]
      }
    ]
  },
  {
    appCode: 'rms',
    appPanelCode: 'admin-panel',
    appModuleCode: 'collection',
    appMenuTemplateCode: 'riskRatings',
    name: 'riskRatings',
    templatePath: servicePath + '/rms/admin',
    templates: [
      {
        code: 'riskRatingTypes',
        name: 'risk-rating-type',
        label: 'Type of Risk Rating',
        detailPath: '/risk-rating-type',
        detailView: [
          {
            code: 'create-risk-rating-type',
            name: 'create-risk-rating-type',
            label: 'Type of Risk Rating',
          }
        ]
      }
    ]
  },
  {
    appCode: 'rms',
    appPanelCode: 'admin-panel',
    appModuleCode: 'collection',
    appMenuTemplateCode: 'natureOfJobs',
    name: 'natureOfJobs',
    templatePath: servicePath + '/rms/admin',
    templates: [
      {
        code: 'jobNature',
        name: 'job-nature',
        label: 'Nature of Job',
        detailPath: '/job-nature',
        detailView: [
          {
            code: 'create-job-nature',
            name: 'create-job-nature',
            label: 'Nature of Job',
          }
        ]
      }
    ]
  },
  {
    appCode: 'rms',
    appPanelCode: 'admin-panel',
    appModuleCode: 'collection',
    appMenuTemplateCode: 'yearlyTransactionLimits',
    name: 'yearlyTransactionLimits',
    templatePath: servicePath + '/rms/admin',
    templates: [
      {
        code: 'yearlyTransactionLimit',
        name: 'yearly-transaction-limit',
        label: 'Yearly Transaction Limit',
        detailPath: '/yearly-transaction-limit',
        detailView: [
          {
            code: 'create-yearly-transaction-limit',
            name: 'create-yearly-transaction-limit',
            label: 'Yearly Transaction Limit',
          }
        ]
      }
    ]
  },
  {
    appCode: 'rms',
    appPanelCode: 'admin-panel',
    appModuleCode: 'collection',
    appMenuTemplateCode: 'singleTransactionLimits',
    name: 'singleTransactionLimits',
    templatePath: servicePath + '/rms/admin',
    templates: [
      {
        code: 'singleTransactionLimit',
        name: 'single-transaction-limit',
        label: 'Single Transaction Limit',
        detailPath: '/single-transaction-limit',
        detailView: [
          {
            code: 'create-single-transaction-limit',
            name: 'create-single-transaction-limit',
            label: 'Single Transaction Limit',
          }
        ]
      }
    ]
  },
  {
    appCode: 'rms',
    appPanelCode: 'admin-panel',
    appModuleCode: 'calenders',
    appMenuTemplateCode: 'timeZones',
    name: 'timeZones',
    templatePath: servicePath + '/rms/admin',
    templates: [
      {
        code: 'timeZones',
        name: 'fund-source',
        label: 'Time Zones',
        detailPath: '/',
        detailView: []
      }
    ]
  },
  {
    appCode: 'rms',
    appPanelCode: 'admin-panel',
    appModuleCode: 'calenders',
    appMenuTemplateCode: 'calendarSetup',
    name: 'calendarSetup',
    templatePath: servicePath + '/rms/admin',
    templates: [
      {
        code: 'calendarSetup',
        name: 'fund-source',
        label: 'Calendar Setup',
        detailPath: '/',
        detailView: []
      }
    ]
  },
  {
    appCode: 'rms',
    appPanelCode: 'admin-panel',
    appModuleCode: 'calenders',
    appMenuTemplateCode: 'calendarAssign',
    name: 'calendarAssign',
    templatePath: servicePath + '/rms/admin',
    templates: [
      {
        code: 'calendarAssign',
        name: 'fund-source',
        label: 'Calendar Assign',
        detailPath: '/',
        detailView: []
      }
    ]
  },


  {
    appCode: 'rms',
    appPanelCode: 'admin-panel',
    appModuleCode: 'batchengine',
    appMenuTemplateCode: 'batchProcesses',
    name: 'batchProcess',
    templatePath: servicePath + '/rms/admin',
    templates: [
      {
        code: 'batch-process',
        name: 'batch-process',
        label: 'Batch Process',
        detailPath: '/batch',
        detailView: [
          {
            code: 'create-batch',
            name: 'create-batch',
            label: 'Batch',
          }
        ]
      }
    ]
  },
  {
    appCode: 'rms',
    appPanelCode: 'admin-panel',
    appModuleCode: 'batchengine',
    appMenuTemplateCode: 'jobs',
    name: 'jobProcess',
    templatePath: servicePath + '/rms/admin',
    templates: [
      {
        code: 'batch-job',
        name: 'batch-job',
        label: 'Job',
        detailPath: '/batch-job',
        detailView: [
          {
            code: 'create-job',
            name: 'create-job',
            label: 'Job',
          }
        ]
      }
    ]
  },


]
