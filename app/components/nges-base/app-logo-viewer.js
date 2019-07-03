import Component from '@ember/component';
import {inject as service} from '@ember/service';
import config from 'frontend-engine/config/environment'
export default Component.extend({
  appLogo: config.APP.appLogo,

  didReceiveAttrs() {
    this._super(...arguments);
    this.set('appLogo',this.appLogo);
  }
});
