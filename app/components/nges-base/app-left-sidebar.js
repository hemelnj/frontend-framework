import Component from '@ember/component';
import {inject as service} from '@ember/service';
import config from 'frontend-engine/config/environment';

export default Component.extend({


  appLogo: config.APP.appLogo,
  appConfiguration: service('app-configuration'),
  init() {
    this._super(...arguments);
    this.set('appLogo', this.appLogo);
  },


  didReceiveAttrs() {
    this._super(...arguments);
    let moduleList = this.get('moduleList');
    let appPanelInformation = this.get('appPanelInformation');

    //console.log('message-appPanelInformation', this.get('appPanelInformation'));



    let hasSuperAdmin = this.appConfiguration.hasThisRoleByName("role_super_admin");


    let menuTemplate = [

      {
        type:'admin',
        appPanelInformation: appPanelInformation,
        label: 'CALENDER',
        code: 'calender',
        name: 'calender',
        subMenuList: [
          {
            label: 'Time Zone',
            code: 'time_zone',
            name: 'time_zone',
          },
          {
            label: 'Calendar Setup',
            code: 'calendar_setup',
            name: 'calendar_setup',
          },
          {
            label: 'Calendar Assign',
            code: 'calendar_assign',
            name: 'calendar_assign',
          }
        ]
      },


    ];


   this.set('menuTemplate', menuTemplate);
   this.set('accessRole', hasSuperAdmin);

  }


});
