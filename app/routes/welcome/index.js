import Route from '@ember/routing/route';
import config from '../../config/environment';
import {inject as service} from '@ember/service';

export default Route.extend({


  intl: service(),
  beforeModel() {
    //console.log('message', ' loading index page');
    this.get('intl').setLocale(['bn-ln']);
  }

});
