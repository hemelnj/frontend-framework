
# NGES Frontend Framework
1. [Architectural Specifications](#frontend-framework-architectural-specifications)
2. [Frontend Framework Manageability](#frontend-framework-manageability)
    - [Frontend Framework manageability](#frontend-framework-manageability)
      - [Versioning policy for multiple product team](#versioning-policy-for-multiple-product-team)
      - [Framework Project Layout](#framework-project-layout)
      - [Framework Ember Data Support](#framework-ember-data-support)
      - [Rest Http Client For Restful Request](#rest-http-client-for-restful-request)
      - [Framework Environment Meta Information](#framework-environment-meta-information)
3. [Frontend Framework Reusable Resources](#frontend-framework-reusable-resources)




# Frontend Framework Architectural Specifications

Frontend Framework Two Types of Meta Configuration:

  -	[Design Meta].
  -	[Business Meta].

#### 1. Design Meta:
  When components were developed their Look and Feel or UI & UX meta information defined into Fronted Engine. Developed components must be isolated so that easily business meta can be consumable.
  
  > Query Notes: 
  
  - [X] Components UI & UX meta will be given as resource.

#### 2. Business Meta:
  For populating components Look and Feel, Interact with Business meta information. Business meta provided by services.
  
  > Query Notes: 
  
  - [X] Business meta processed by template through consuming service API endpoints then UI will be populated.
  - [X] Needs templates and objects mapping configuration into service so that based on user selection that template can render.
  


| [Fronted Engine (Select template, base on client meta)]                     |
| -------------                                                               |
| - Template (Process Service Meta & logical implementation)                  |
| - Components (Developed as resource library and isolated)                   |


# Frontend Framework manageability

Frontend Framework manageability and versioning policy for multiple product team.


## Versioning policy for multiple product team.


- [ ] Always Front Framework on one Baseline Version (`latest`, `stable`). 
- [ ] Development Team will `start` with `stable version`. 
- [ ] NGES team will `continuously improve` the `stable` changing the `version` number in 2nd and 3rd digit. `v1.0.1, v1.0.2,...`
- [ ] The `development team` will `pull this manually` but the `compatibility and TODO guideline` should always be provided by NGES team.


## Framework Project Layout

> Project layout is important to organize service and other resources

```
 app
  ├── adapters
  |   ├── nges-core
  |   ├── nges-elements
  |   ├── nges-engines
  |   |   ├── auth-engine
  |   |   ├── olm
  |   |   ├── property-externder
  |   |   ├── tree-engine
  |   |   └── more..
  ├── components
  |   ├── nges-base
  |   ├── nges-core
  |   ├── nges-elements
  |   ├── nges-engines
  |   |   ├── auth-engine
  |   |   ├── olm
  |   |   ├── property-externder
  |   |   ├── tree-engine
  |   |   └── more..
  |   └── nges-services
  |   |   ├── cbs
  |   |   ├── rms
  |   |   └── ...more
  |
  ├── helpers
  |   ├── nges-core
  |   ├── nges-elements
  |   ├── nges-engines
  |   |   ├── auth-engine
  |   |   ├── olm
  |   |   ├── property-externder
  |   |   ├── tree-engine
  |   |   └── more..
  |   ├── nges-services
  |   |   ├── cbs
  |   |   ├── rms
  |   |   └── ...more
  |   └── more..
  |
  ├── services
  |   ├── nges-core
  |   ├── nges-elements
  |   ├── nges-engines
  |   |   ├── auth-engine
  |   |   ├── olm
  |   |   ├── property-extender
  |   |   ├── tree-engine
  |   |   └── more..
  |   ├── nges-services
  |   |   ├── cbs
  |   |   ├── rms
  |   |   └── ...more
  |
  ├── mixins
  |   ├── nges-core
  |   ├── nges-elements
  |   ├── nges-engines
  |   |   ├── auth-engine
  |   |   ├── olm
  |   |   ├── property-extender
  |   |   ├── tree-engine
  |   |   └── more..
  |   ├── nges-services
  |   |   ├── cbs
  |   |   ├── rms
  |   |   └── ...more
  |
  ├── models
  |   ├── nges-core
  |   ├── nges-elements
  |   ├── nges-engines
  |   |   ├── auth-engine
  |   |   ├── olm
  |   |   ├── property-extender
  |   |   ├── tree-engine
  |   |   └── more..
  |   ├── nges-services
  |   |   ├── cbs
  |   |   ├── rms
  |   |   └── ...more
  |
  ├── templates
  |   ├──components
  |   ├── nges-core
  |   ├── nges-elements
  |   ├── nges-engines
  |   |   ├── auth-engine
  |   |   ├── olm
  |   |   ├── property-extender
  |   |   ├── tree-engine
  |   |   └── more..
  |   ├── nges-services
  |   |   ├── cbs
  |   |   ├── rms
  |   |   └── ...more
```

> Description: `components`,`templates`,`services`,`helpers`,`mixins`,`adapter`,`models`,`style` directory contains `nges-base`, `nges-core`, `nges-elements` and `nges-services`. 
  
  - `nges-base` folder contains frame work resources.
  - `nges-core` folder contains atomic components so that those can be maximum reusable for future resource libraries.
  - `nges-elements` folder contains complex ui, using groups of `nges-core` components as `resource libraries`.
  - `nges-services` folder contains services, services layouts and it's logical implementations as resource.
  - `nges-engines` folder contains engines, workflow implementations as resource libraries.

```handlebars
// sample structure
 app
  ├── components
  |   ├── nges-core
  |   ├── nges-elements
  |   ├── nges-engines
  |   |   ├── olm
  |   |   ├── ppe
  |   |   ├── rue
  |   |   ├── tee
  |   |   └── more..
  |   ├── nges-services
  |   |   ├── cbs
  |   |   ├── rms
  |   |   └── ...more
  
```
  
  
  
  
  
  


## Framework Ember Data Support

Frontend Framework Adapters & Models Setup

- Adapter use for XHR (REST API Requests) 
- We can configure backend host, URL format and headers used to talk to a REST API in an adapter
- If we use EmberData then, we need to configure adapters.

Frontend Framework Support two types of model creations

- Static model and
- Dynamic model

#### Static Model Creation

To create static models config adapters and models manually

```
 app
  ├── adapters
  |   ├── nges-core
  |   ├── nges-elements
  |   ├── nges-engines
  |   |   ├── olm
  |   |   ├── ppe
  |   |   ├── rue
  |   |   ├── tee
  |   |   └── more..
  ├── models
  |   ├── nges-core
  |   ├── nges-elements
  |   ├── nges-engines
  |   |   ├── auth-engine
  |   |   ├── olm
  |   |   ├── property-extender
  |   |   ├── tree-engine
  |   |   └── more..
```

##### Example implementation:- for static model creation:

> Define model in `models/nges-engines/person.js`

```js
  import config from 'frontend-engine/config/environment';
  import DS from 'ember-data';

  
  export default DS.Model.extend({
    name: DS.attr('string'),
    surname: DS.attr('string')
  });
```

> Define adapter `adapters/nges-engines/person.js`

```js
 import config from 'frontend-engine/config/environment';

  export default DS.JSONAPIAdapter.extend({
    host: config.NGES_SERVICE_HOSTS.MOCK_SERVICE_HOST,
  
    ajaxOptions() {
      let hash = this._super(...arguments);
      let { beforeSend } = hash;
  
      hash.beforeSend = xhr => {
        xhr.setRequestHeader('content-type', 'application/json');
        xhr.setRequestHeader('authorization', 'Bearer ' + 'accessToken-sadhan');
      };
      return hash;
    },
  
  });
```

#### Dynamic Model Creation

```js

export default Component.extend({

  // import services on the top 
  appWelcome: service('nges-core/app-welcome'),
  store: service(),
  
  init() {
    this._super(...arguments);
    let context = this;
  
     let url = config.NGES_SERVICE_HOSTS.MOCK_SERVICE_HOST + "/getTableHeader";
        return this.appRestTemplate.httpRestClient(url,  "GET", null, null).then(function (results) {
      
        let modelName = 'nges-services/pom/nges-table';         // model name base on adapter configuration
        let tableColumns = {};
        let tableHeaders = results;                             // this changes with endpoint
     
        // make ember model base on attributes
        for (let i = 0; i < tableHeaders.length; i++) {
      
          if (tableHeaders.type === 'String') {
            tableColumns[tableHeaders.name] = DS.attr('string');
          } else if (tableHeaders.type === 'double') {
            tableColumns[tableHeaders.name] = DS.attr('number');
          }
        }
      
        context.appWelcome.createDynamicModel(modelName, tableColumns);
        context.store.findAll('nges-services/pom/nges-table').then(function (blogPosts) {
          console.log('message-blogPosts', blogPosts);
        });
        
        context.set('tableHeaders', tableHeaders);
      });
        
  }
})

```  


#### NGES-Engines Resource Meta Configurations

open `app/nges-engines/nges-engines-configuration.js`

 ```js
 
  let enginePath = 'nges-engines';
  export default [
  
    {
      code: '1',                            // Must define engine unique code
      name: 'OLM',                          // Engine display name
      templatePath: enginePath + '/olm',    // define engine root directory
      templates: [
        {
          code: 'object-state',             // Through code, resource will be identify. [route path map to code]
          name: 'object-state',             // Through name, resource will be render. [it basically raw resource file name which will render] 
          detailPath: '/',                  // Through detailPath,`details page` nested directory will be configurable  
          detailView: []                    // detail view page then you can configure those with code, name. [**Optional]
        },
        {
          code: 'diagram-tool',
          name: 'diagram-tool',
          detailPath: '/',
          detailView: [
            {
             code: 'detail-page-code',
             name: 'detail-page-file-name'
            }
          ]                    
        },
        
         // ... config meta, for more pages template if needed
      ]
    }
    //... config meta, more engines if needs
  ]

 ```
 
 
 
#### NGES-Services Resource Meta Configurations

> open `app/nges-services/pom/nges-services-configuration.js`
 
 ```js
 
  let servicePath = 'nges-services';
  export default [
    {
     code: '1',                               // Must define service unique code in this blog
     name: 'POM',                             // Service display name
     templatePath: servicePath + '/pom',      // define service root directory
     templates: [
       {
         code: 'pom',                         // Through code, resource will be identify. [route path map to code]
         name: 'payorder-management',         // Through name, resource will be render. [it basically raw resource file name which will render] 
         detailPath: '/',                     // Through detailPath,`details page` nested directory will be configurable  
         detailView: [                        // detail view page then you can configure those with code, name. [**Optional]
           {
             code: 'pom-detail-view',
             name: 'payorder-details'
           },
           
           // ... more details pages if needs
         ],
       },
       
       // ... config meta, for more pages template if needed
     ]
   },
    // ... config meta, more services if needs
  ]

 ```
 
> `Notes:` Engine and Service related required files, adapters, helpers, models, components, mixins, models, styles, templates are need to be package into predefined `NGES Project layouts`.


## Rest Http Client For Restful Request

`Custom Rest Http Client For Restful Request [API Client Wrapper]`

create ember service then call, create function, like below

```js

export default Service.extend({

  //...more
  examplePersonRequest() {
    let roles = JSON.stringify([1, 2, 3]);         // convert your object to string
    
    let beforeSend = function (xhr) {
      xhr.setRequestHeader('content-type', 'application/json');
      xhr.setRequestHeader('authorization', 'Bearer ' + accessToken);
    };
    
    // if any property not want to pass then simply keep it null
    let headers = {
      'Authorization': 'Basic xxxxxxxxxxxxx',
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
    
    let url = this.treeEngineHost + "/menuTrees/findMenuTreeByRoleList";
    return this.appRestTemplate.httpRestClient(url, "POST",
      roles, headers, beforeSend
    ); // it return promise
  }
  
});
```


## Framework Environment Meta Information

> To Framework meta configuration,  `config/environment.js`

```handlebars

APP: {
  appName: 'Frontend Framework',        // change application name
  appTitle: 'Frontend as Service',      // change application title 
  appLogo: 'logo.png'                   // change application logo, [Put logo in public folder]
}
```

> NGES all UI HOST configuration

```js
ENV.NGES_UI_HOSTS = {
  TREE_ENGINE_UI_HOST: 'http://localhost:4300',
  AUTH_ENGINE_UI_HOST: 'http://localhost:4400',
  PROPERTY_EXTENDER_ENGINE_UI_HOST: 'http://localhost:4200',
  
  //... more ui hosts
};
```

> NGES all backend services host configuration

```js
ENV.FRONTEND_SERVICE_HOSTS = {
  OLM_SERVICE_HOST: 'http://www.example.com',
  TREE_SERVICE_HOST: 'http://www.example.com',
  MOCK_SERVICE_HOST: 'http://192.168.20.2:8089',
  AUTH_SERVICE_HOST: 'http://www.example.com',
  
  //.. more Backend Service hosts
};
```

> `Optional:` if want to configuration you engine in different environment then define your environment here..

```js
if (environment === 'development') {

ENV.FRONTEND_SERVICE_HOSTS['AUTH_SERVICE_HOST'] = 'http://www.example.com';
ENV.FRONTEND_SERVICE_HOSTS['OLM_SERVICE_HOST'] = 'http://www.example.com';

//.. more Backend and UI Hosts
}
```

> `Notes`: Change or include host url or environment meta if needed.


## Frontend Framework Reusable Resources

- nges-common-grid
- nges-autocomplete
- nges-multi-select-box
- nges-item-selector-box
- nges-dual-list-box



## How to use `nges-common-grid`

Create `app/components/nges-services/rms-example/rms-example-file.js` and includes

```js
let  serviceActionableRoute = {
      create: {
        routePath: 'create-remitter',
        label: 'New Remitter',
      },
      edit: {
        routePath: 'edit-remitter',
        label: 'View Remitter',
      }
    };

this.set('serviceActionableRoute', serviceActionableRoute)
```

Create `app/templates/components/nges-services/rms-example/rms-example-file.hbs` and includes

```handlebars

{{nges-elements/nges-common-grid
  serviceActionableRoute = serviceActionableRoute
}}

```


## How to use `nges-autocomplete`

Create `app/components/nges-services/rms-example/rms-example-file.js` and includes

```js
let sampleDataList = [
      {"id": 1, "disabled": false, "selected": false, "displayName": "Dhaka", "value": "dhaka"},
      {"id": 3, "disabled": false, "selected": false, "displayName": "Nazipur", "value": "nazipur"},
      {"id": 4, "disabled": false, "selected": true, "displayName": "Naogaon", "value": "nogaon"}
    ];
this.set('sampleDataList', sampleDataList);

//... callback method
actions() {
  autocompleteOnSelectAction(selectedValue){
    console.log('message', selectedValue);
  }
}
```

Create `app/templates/components/nges-services/rms-example/rms-example-file.hbs` and includes

```handlebars

{{nges-core/nges-autocomplete
  dataList=sampleDataList
  displayName='Place Holder Name'
  autocompleteOnSelect=(action 'autocompleteOnSelectAction')
}}

```


## How to use `nges-multi-select-box`

Create `app/components/nges-services/rms-example/rms-example-file.js` and includes

```js
 let componentData = {
      itemId: 'itemIdWillBeUnique',   // it should be unique in same view page
      initialData: [
        {
          "label": "Group A",
          "data": [
            {"id": 1, "disabled": false, "selected": false, "view": "Bangladesh", "value": "bangladesh"},
            {"id": 2, "disabled": false, "selected": true, "view": "Japan", "value": "japan"},
            {"id": 3, "disabled": true, "selected": false, "view": "USA", "value": "usa"}
          ]
        },
        {
          "label": "Group B",
          "data": [
            {"id": 1, "disabled": false, "selected": false, "view": "Dhaka", "value": "dhaka"},
            {"id": 3, "disabled": false, "selected": false, "view": "Nazipur", "value": "nazipur"},
            {"id": 2, "disabled": false, "selected": true, "view": "Naogaon", "value": "nogaon"}
          ]
        }
      ]
    };
this.set('componentData', componentData);

```

Create `app/templates/components/nges-services/rms-example/rms-example-file.hbs` and includes

```handlebars

{{nges-core/nges-multi-select-box componentData=componentData}}


```


## How to use `nges-item-selector-box`

Create `app/components/nges-services/rms-example/rms-example-file.js` and includes

```js

this.set('selectBoxDataLists', [
    {'name': 'Bangladesh', 'selected': false,},
    {'name': 'Dhaka', 'selected': true,},
  ]);

//... get selected value
actions: {
  getItemSelectorBoxData() {
    console.log('message', JSON.stringify(this.get('selectBoxDataLists')));
  }
}
```

Create `app/templates/components/nges-services/rms-example/rms-example-file.hbs` and includes

```handlebars

{{nges-core/nges-item-selector-box groupLabel='nges-item-selector-box' selectBoxDataLists=selectBoxDataLists}}
<button {{action 'getItemSelectorBoxData'}}>Get Data</button>

```


## How to use `nges-dual-list-box`

Create `app/components/nges-services/rms-example/rms-example-file.js` and includes

```js

  let data_available = [
    {attributes: {id: 1, name: "Dhaka"}},
    {attributes: {id: 2, name: "Mirpur"}}
  ];
  let data_selected = [
    {attributes: {id: 1, name: "Dhanmondi"}}
  ];
    
  let data = {
    available: data_available,
    selected: data_selected
  };

  this.set('dualBoxData', data);  // selected values automatically updated
```

Create `app/templates/components/nges-services/rms-example/rms-example-file.hbs` and includes

```handlebars

{{nges-elements/sadhan-dual-list-box dualBoxData = dualBoxData}}

```
