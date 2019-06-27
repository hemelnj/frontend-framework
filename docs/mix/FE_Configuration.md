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




## NGES FE Framework Project Layout.


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
  |   └── content-viewer.js
  |   ├── app-left-sidebar.js
  |   └── app-top-navbar.js
  |
  ├── helpers
  |   ├── nges-core
  |   ├── nges-elements
  |   ├── nges-engines
  |   |   ├── olm
  |   |   ├── ppe
  |   |   ├── rue
  |   |   ├── tee
  |   |   └── more..
  |   ├── nges-services
  |   |   ├──cbs
  |   |   ├── rms
  |   |   └── ...more
  |
  ├── services
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
  |
  ├── mixins
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
  |
  ├── controllers
  |   ├── welcome
  |   |   ├── index.js
  |   |   └── panel-loader.js
  |   └── welcome.js
  |
  ├── models
  |   ├── app-menu.js
  |   ├── app-service.js
  |   └── app-sub-menu.js
  |
  ├── routes
  |   ├── welcome
  |   |   ├── service-loader
  |   |   ├── service-item-loader
  |   |   |   ├── item-template-loader
  |   |   |   |   └── submenu-detail-template-loader.js
  |   |   └── service-item-loader.js
  |   |
  |   ├── index.js
  |   ├── login.js
  |   ├── not-found.js
  |   ├── registration.js
  |   └── welcome.js
  |
  ├── templates
  |   ├──components
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
  |   ├── content-viewer.hbs
  |   ├── left-sidebar.hbs
  |   └── top-navbar.hbs
```

##### Description:

`components`,`templates`,`service`,`helpers`,`mixins` package contains `nges-core`, `nges-elements` and `nges-services`. 
  - `nges-core` folder contains atomic components so that those can be maximum reusable for future resource libraries.
  - `nges-elements` folder contains complex ui, using groups of nges-core components as resource libraries.
  - `nges-services` folder contains services, object layouts and logical implementations as resource libraries.
  - `nges-engines` folder contains engines, object layouts and logical implementations as resource libraries.

  ```javascript
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

To create static model, layouts

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
  |   |   ├── olm
  |   |   ├── ppe
  |   |   ├── rue
  |   |   ├── tee
  |   |   └── more..
```

> Example how to create static model:

```javascript

  // define model `models/nges-engines/person.js`
  import config from 'frontend-engine/config/environment';
  import DS from 'ember-data';

  
  export default DS.Model.extend({
    name: DS.attr('string'),
    surname: DS.attr('string')
  });
  
  
  // define adapter `adapters/nges-engines/person.js`
  export default DS.JSONAPIAdapter.extend({
    host: config.FRONTEND_SERVICE_HOSTS.MOCK_SERVICE_HOST,
  
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


## Dynamic Model Creation

```javascript

// import services on the top 
appWelcome: service('nges-core/app-welcome'),
store: service(),

// .....
let context = this;
this.pomInitialization.getTableHeader().then(function (results) {

  let modelName = 'nges-services/pom/nges-table';         // model name base on adapter configuration
  let tableColumns = {};
  let tableHeaders = results;        // this changes with endpoint


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

```



## NGES-Engines Configurations

 ```javascript
 //open `app/nges-engines/olm/nges-engines-configuration.js`
 
  let enginePath = 'nges-engines';
  export default [
  
    {
      code: '1',                            // Must define engine unique code
      name: 'OLM',                          // Engine display name
      templatePath: enginePath + '/olm',    // define engine root directory
      templates: [
        {
          code: 'object-state',             // template code which need to map future 
          name: 'object-state',             // give a name of that template for identification 
          detailPath: '/',                  // configure details page directory if you want
          detailView: []                    // If you have detail view page then you can congifura those with code, name
        },
        {
          code: 'diagram-tool',
          name: 'diagram-tool',
          detailPath: '/',
          detailView: []                    
        },
        
         // ... more templates page if needs
      ]
    }
    //... more engines if needs
  ]

 ```
 

## NGES-Services Configurations

 ```javascript
 // open `app/nges-services/pom/nges-services-configuration.js`
 
   let servicePath = 'nges-services';
   export default [
   
     {
       code: '1',                               // Must define service unique code
       name: 'POM',                             // Service display name
       templatePath: servicePath + '/pom',      // define service root directory
       templates: [
         {
           code: 'pom',                         // template code which need to map future 
           name: 'payorder-management',         // give a name of that template for identification 
           detailPath: '/',                     // configure details page directory if you want
           detailView: [                        // If you have detail view page then you can congifura those with code, name
             {
               code: 'pom-detail-view',
               name: 'payorder-details'
             },
             
             // ... more details pages if needs
           ],
         },
         
         // ... more templates page if needs
       ]
     },
      // ... more services if needs
   ]

 ```
 
 
## Notes:
    
    Engine and Service related required files, adapters, helpers, models, components, mixins, models, styles, templates are need to be package into predefined layouts.



## Custom Rest Http Client For Restful Request

```javascript

// app/services/app-rest-template.js

//just initiate this service like normal ember service then call

let roles = JSON.stringify([1, 2, 3]]);

let beforeSend = function (xhr) {
  xhr.setRequestHeader('content-type', 'application/json');
  xhr.setRequestHeader('authorization', 'Bearer ' + accessToken);
};

let headers = {
  'Authorization': 'Basic xxxxxxxxxxxxx',
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}

let url = this.treeEngineHost + "/menuTrees/findMenuTreeByRoleList";
return this.appRestTemplate.httpRestClient(url, "POST",
  roles, headers, beforeSend
);

// if any property not want to pass then smiply keep it null

```

## Configure Engine Meta Information

> To engine meta configuration,  `config/environment.js`

```javascript

APP: {
  appName: 'Frontend Engine',           // change engine name
  appTitle: 'Frontend as Service',      // change engine title 
}

```



> NGES all UI HOST configuration

```javascript

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
  OLM_SERVICE_HOST: 'http://olm-ngfs-core-framework.apps.115.127.24.184.nip.io',
  TREE_SERVICE_HOST: 'http://treeengine-ngfs-core-framework.apps.115.127.24.184.nip.io',
  MOCK_SERVICE_HOST: 'http://192.168.20.2:8089',
  AUTH_SERVICE_HOST: 'http://auth-ngfs-core-framework.apps.115.127.24.184.nip.io',
  
  //.. more Backend Service hosts
};

```



> Optional: if want to configuration you engine in different environment then difine your enviromnet here..

```javascript
if (environment === 'development') {

ENV.FRONTEND_SERVICE_HOSTS['AUTH_SERVICE_HOST'] = 'http://auth-ngfs-core-framework.apps.115.127.24.184.nip.io';
ENV.FRONTEND_SERVICE_HOSTS['PO_SERVICE_HOST'] = 'http://payorder-ngfs-core-framework.apps.115.127.24.184.nip.io';


//.. more Backend and UI Hosts
}
```


