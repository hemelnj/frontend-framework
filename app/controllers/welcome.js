import Controller from '@ember/controller';
import {inject as service} from '@ember/service';
import Authorization from '../mixins/authorization'

export default Controller.extend(Authorization, {

  appAuth: service('app-configuration'),
  appRestTemplate: service('app-rest-template'),

  actions: {

  },

  init() {
    this._super(...arguments);

  }


});
