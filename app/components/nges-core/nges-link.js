import Component from '@ember/component';
import {computed} from '@ember/object';
import {inject as service} from '@ember/service';


export default Component.extend({

  appConfiguration: service('app-configuration'),
  router: service(),
  init() {
    this._super(...arguments);
  },


  actions: {

    onClick(route, routePath) {

      this.get('router').transitionTo(
        route,
        routePath
      );

      let params = this.get('params');                // pass from parent
      if(params) {
        this.appConfiguration.setRouteParams(params);
      }


    }
  }


});
