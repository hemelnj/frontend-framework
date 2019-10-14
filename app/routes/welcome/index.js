import Route from '@ember/routing/route';
import config from '../../config/environment';
import {inject as service} from '@ember/service';

export default Route.extend({


  intl: service(),
  beforeModel() {
    let currentLocale = this.get('intl.locale');
    this.get('intl').setLocale(currentLocale);
  }

});
