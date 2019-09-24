# Frontend Engine Routing Concepts

Routing is most important part for frontend engine.


# Engine Route Implementation


```bash


G:-             application |     panel       | module (host-url)       | teller-function  | service       | function(stateList)       | sub-function
FG:-            application |     panel       | module                  | service-holder   | menu          | submenu                   | details


FE:{user}:-     rms         | user.panel      | operation.collection1   | teller-function1 | dashboard     | dashboard-registration    | remitter-details
FE:{user}:-     rms         | user.panel      | operation.collection1   | teller-function1 | remitter      | remitter-registration     | remitter-details
FE:{user}:-     rms         | user.panel      | operation.collection1   | teller-function1 | benificiary   | benificiary-registration  | remitter-details



FE:{admin}:-    rms         | admin.panel     | admin.collection1       |        x         | olm           | diagram-tool              | x
FE:{admin}:-    rms         | admin.panel     | admin.collection1       |        x         | collection    | country                   | x
FE:{admin}:-    rms         | admin.panel     | admin.common parameter  |        x         | collection    | country                   | x



FE{G}:-         |rms        |panel            | module                  | service-holder   |service         |function                  | details
FE{Admin}:-     |rms        |admin-panel      | collection              | FUNCTION         |countries       |country-reg               | x
FE{User}:-      |rms        |operation-panel  | collection              | MICROSERVICE     |remitters       |remitter-reg              | x


```







### Fronted Engine Routing Levels

```
  RL----------1/----------------/2--------------------/3--------------------4/----------------
  www.nges.com/[application-panel-loader]/[microservice-loader]/[item-template-loader]/[template-view-loader]
  
  
```


#### Route L1 (R-L1)
- [X] `Redirect login page` if no one login into system
- [X] If login Success:GO-> Welcome | Failed:GO-> Login

> login Page

- [X] Base on user credential it might, Success Or Failed.
- [X] Success:-> Redirect to `welcome page`.
- [X] Success:-> Store Authorize user information in localstorage.
- [ ] Failed:-> `Redirect login page`


> Welcome Page

- [ ] `Top MenuBar generate` with user all permitted services.
- [ ] `SideBar generate` Hidden and Empty by default.
- [ ] `Menu Tree Hierarchy Process` request treeEngine and process.



#### Route L2 (R-L2)
- [ ] After, selected a service
- [ ] `SideBar generate` base on **Each Service Groups and it's Menu Items**. 


#### Route L3 (R-L3)
- [ ] Base on `service` and `service item` process template `meta information` 
- [ ] Need `master component` that render template `meta information` view
 

#### Route L4 (R-L4)
- [ ] Base on selected `service`, `service item`, `service template` and 
 `template meta information` template view will be render after process it's components.
 
- [ ] Details View 



# Route Generation Commands

```bash


ember g route welcome/application-loader/panel-loader/module-loader/service-holder-loader/menu-template-loader/submenu-template-loader/submenu-detail-template-loader/params-loader



```

# Custom Transtition Route

```javascript

let route = "welcome.application-loader.panel-loader.module-loader.service-holder-loader.menu-template-loader.submenu-template-loader.submenu-detail-template-loader.params-loader";
this.get("router").transitionTo(route, 'edit-page', 'value');

```

Output:

  http://192.168.20.147:4300/rms/operation/collection/FUNCTION/remitters/remitter-reg/edit-page/value


# Custom Path

```js
this.get("router").transitionTo('/rms/operation/collection/FUNCTION/remitters/remitter-reg/edit-page/value');
```

Output:

  http://192.168.20.147:4300/rms/operation/collection/FUNCTION/remitters/remitter-reg/edit-page/value
