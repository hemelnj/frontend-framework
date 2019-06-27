import Mixin from '@ember/object/mixin';
import {inject as service} from '@ember/service';

export default Mixin.create({

  router: service(),
  appAuth: service('app-configuration'),
  appRestTemplate: service('app-rest-template'),
  appConfiguration: service('app-configuration'),
  isAuthorization() {

    let userInformation = this.appAuth.getAuthorizedUserInformation();


    if (userInformation == null) {
      return false;
    } else {
      return true;
    }

  },

  clearAuthorization(){
    this.appAuth.clearAppInformation();
    //this.transitionTo("login");
    this.get('router').transitionTo('login');
  }


});
