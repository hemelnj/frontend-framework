## NGES - Frontend Engine Architectural Specifications and Implementation Documentation

Frontend Engine Two Types of Meta Configuration:

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




## NGES Frontend Framework Project Layout.


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
  ├── model
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

##### Description:

`components`,`templates`,`service`,`helpers`,`mixins` package contains `nges-core`, `nges-elements` and `nges-services`. 
  - `nges-base` folder contains frame work resources.
  - `nges-core` folder contains atomic components so that those can be maximum reusable for future resource libraries.
  - `nges-elements` folder contains complex ui, using groups of `nges-core` components as `resource libraries`.
  - `nges-services` folder contains services, services layouts and it's logical implementations as resource.
  - `nges-engines` folder contains engines, workflow implementations as resource libraries.

  ```bash
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
  
  
## Frontend Engine Adapters & Models

- Adapter use for XHR (REST API Requests) 
- We can configure backend host, URL format and headers used to talk to a REST API in an adapter
- If we use EmberData then, we need to configure adapters.

Frontend Engine Support two types of model creations

- Static model and
- Dynamic model

## Static Model Creation

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

Define model in `models/nges-engines/person.js`

```js
  import config from 'frontend-engine/config/environment';
  import DS from 'ember-data';

  
  export default DS.Model.extend({
    name: DS.attr('string'),
    surname: DS.attr('string')
  });
```

Define adapter `adapters/nges-engines/person.js`

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


##### Dynamic Model Creation

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



## NGES-Engines Resource Meta Configurations

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
 

## NGES-Services Resource Meta Configurations

open `app/nges-services/pom/nges-services-configuration.js`
 
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
 
 
## Notes:
    
Engine and Service related required files, adapters, helpers, models, components, mixins, models, styles, templates are need to be package into predefined `NGES Project layouts`.



## Custom Rest Http Client For Restful Request

```js
//just initiate this service like normal ember service then call

let roles = JSON.stringify([1, 2, 3]);

let beforeSend = function (xhr) {
  xhr.setRequestHeader('content-type', 'application/json');
  xhr.setRequestHeader('authorization', 'Bearer ' + accessToken);
};

let headers = {
  'Authorization': 'Basic xxxxxxxxxxxxx',
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};

let url = this.treeEngineHost + "/menuTrees/findMenuTreeByRoleList";
return this.appRestTemplate.httpRestClient(url, "POST",
  roles, headers, beforeSend
); // it return promise

// if any property not want to pass then simply keep it null

```

## Configure Engine Environment Meta Information

> To engine meta configuration,  `config/environment.js`

```bash

APP: {
  appName: 'Frontend Engine',           // change engine name
  appTitle: 'Frontend as Service',      // change engine title 
  appLogo: 'logo.png',                  // change logo with path
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

```javascript

ENV.FRONTEND_SERVICE_HOSTS = {
  OLM_SERVICE_HOST: 'http://www.example.com',
  TREE_SERVICE_HOST: 'http://www.example.com',
  MOCK_SERVICE_HOST: 'http://192.168.20.2:8089',
  AUTH_SERVICE_HOST: 'http://www.example.com',
  
  //.. more Backend Service hosts
};

```

> Optional: if want to configuration you engine in different environment then difine your enviromnet here..

```javascript
if (environment === 'development') {

ENV.FRONTEND_SERVICE_HOSTS['AUTH_SERVICE_HOST'] = 'http://www.example.com';
ENV.FRONTEND_SERVICE_HOSTS['OLM_SERVICE_HOST'] = 'http://www.example.com';

//.. more Backend and UI Hosts
}
```

`Notes`: Change or include host url or environment meta if needed.



