import Service, {inject as service} from '@ember/service';
import config from '../../config/environment';
import Ember from 'ember';

export default Service.extend({


  appWelcome: service('nges-core/app-welcome'),
  store: service(),
  appConfiguration: service('app-configuration'),
  serviceInitializer: service('nges-services/service-initializer'),
  getProcessedTabMeta(defaultActiveTab, tabMetaInfo) {

    let tabsDataAfterProcess = [];

    if(tabMetaInfo === undefined || tabMetaInfo === null){
      tabMetaInfo = [];
    }

    // must active tab id and name match with api result
    for (let i = 0; i < tabMetaInfo.length; i++) {

      if (
        //defaultActiveTab.id === tabMetaInfo[i].id ||
      //ignoreCaseAndRemoveSpace(defaultActiveTab.code) === ignoreCaseAndRemoveSpace(tabMetaInfo[i].code) ||
        ignoreCaseAndRemoveSpace(defaultActiveTab.name) === ignoreCaseAndRemoveSpace(tabMetaInfo[i].name)
      ) {

        tabsDataAfterProcess.push({
          'id': tabMetaInfo[i].id,
          'name': tabMetaInfo[i].name,
          'code': tabMetaInfo[i].code,
          'tabContentClass': 'active',
          'tabTitleClass': 'active'
        });
      } else {
        tabsDataAfterProcess.push({
          'id': tabMetaInfo[i].id,
          'name': tabMetaInfo[i].name,
          'code': tabMetaInfo[i].code,
          'tabContentClass': 'fade',
          'tabTitleClass': '',
        });
      }
    }

    return tabsDataAfterProcess;
  },

  loadTabTableData(defaultFunction, defaultLocation, roleList, stateList, accessToken) {

    let context = this;
    return new Promise(function (resolve, reject) {
      context.serviceInitializer.getClassType(accessToken).then(function (result) {
        let classTypeId = result.data;

        let payload = {
          roleList: roleList,
          defaultFunction: defaultFunction,
          defaultLocation: defaultFunction,
          classTypeId: classTypeId,
          stateList: stateList
        };

        context.serviceInitializer.getFindAll(accessToken, payload).then(function (result) {
          if (result) {
            resolve(result);
          } else {
            reject(Error("It broke"))
          }
        })


      });

    });
  },

});

let ignoreCaseAndRemoveSpace = (value) => {
  if(value !== undefined) {
    return value.toLowerCase().trim();
  }
};

