import Route from '@ember/routing/route';
import {inject as service} from '@ember/service';
import Authorization from '../mixins/authorization'

export default Route.extend(Authorization, {


  appConfiguration: service('app-configuration'),
  appRestTemplate: service('app-rest-template'),
  beforeModel() {


    if( !this.isAuthorization() ){
      this.transitionTo("login");
    }

    //this.store.createRecord('person', {id: 1, name: 'sadhan sarker', surname: 'surname' });
  },

  /*model() {
    return new Ember.RSVP.Promise(function(resolve) {
      Ember.run.later(function() {
        resolve({});
      }, 3000);
    });
  }*/

});
