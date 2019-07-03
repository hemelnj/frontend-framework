import Component from '@ember/component';
import {computed} from '@ember/object';
import {inject as service} from '@ember/service';

const {computed: {alias}, observer} = Ember;

export default Component.extend({


  appConfiguration: service('app-configuration'),
  router: service(),
  routing: service('-routing'),
  urlParams: alias('routing.router.currentState.routerJsState.fullQueryParams'),
  init() {
    this._super(...arguments);
  },


  actions: {

    onClick(routePath) {
      //console.log('message', this.get('urlParams'));

      let host = window.location.host;
      let href = window.location.href;

      let params = this.get('params');
      const querystring = encodeQueryData(params);
      //console.log('message', querystring);


      window.location.replace(href + "/" + routePath + "?" + querystring);

      /*this.get('router').transitionTo(
         'welcome.application-loader.panel-loader.module-loader.service-holder-loader.menu-template-loader.submenu-template-loader.submenu-detail-template-loader',
         routePath
       );*/
    }
  }


});

let encodeQueryData = (data) => {
  const ret = [];
  for (let d in data){
    ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
  }
  return ret.join('&');
};
