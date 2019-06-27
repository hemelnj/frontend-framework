import Controller from '@ember/controller';
import {inject as service} from '@ember/service';
import Authorization from '../../mixins/authorization'
import config from '../../config/environment';
import RSVP from 'rsvp';

export default Controller.extend(Authorization, {

  intl: service(),
  appName: config.APP.appName,
  appConfiguration: service('app-configuration'),
  appRestTemplate: service('app-rest-template'),
  appWelcome: service('nges-core/app-welcome'),
  notifier: service(),


});
