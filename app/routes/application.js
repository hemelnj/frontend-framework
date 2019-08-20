import Route from '@ember/routing/route';
import {inject as service} from '@ember/service';

export default Route.extend({

  /* application.hbs always load, before any template */
  /* always trigger this route so global logic can be here but recommendation will be never put anything here */


  appConfiguration: service('app-configuration'),
  appLogin: service('nges-core/app-login'),
  notifier: service(),
  init(){
    console.log('message---init', 'application.js');
    let accessTokenExpireIn = this.appConfiguration.getAccessExpireIn();
    this.appConfiguration.setExpectedTokenExpireTime(accessTokenExpireIn);
  },
  beforeModel(){

    /*if (Date.now() >= expireToken * 1000) {
      throw new Error(`token expired: ${JSON.stringify(expireToken)}`);
    }else {
      throw new Error(`token expired: ${JSON.stringify(expireToken)}`);
    }*/


   /* if(expireToken !== 0 ){
     setInterval(function() {
       console.log('message', ' token invalid... ');

     }, parseInt(expireToken) *  10000);
   }*/

  }

});
