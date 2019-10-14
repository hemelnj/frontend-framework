import Route from '@ember/routing/route';
import config from '../../config/environment';
import {inject as service} from '@ember/service';

export default Route.extend({


  appConfiguration: service('app-configuration'),
  intl: service(),
  beforeModel() {
    let currentLocale = this.appConfiguration.getAppLanguage();
    console.log('message--currentLocale', currentLocale);
    if(currentLocale===null){
      this.get('intl').setLocale(['en-us']);
    }else{
      this.get('intl').setLocale(currentLocale);
    }

  }

});
