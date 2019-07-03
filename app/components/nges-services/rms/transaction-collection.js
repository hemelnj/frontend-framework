import Component from '@ember/component';
import Service, {inject as service} from '@ember/service';


export default Component.extend({


  init(){
    this._super(...arguments);


    console.log('message', ' registration page');



    this.set('serviceActionableRoute', {
      create: {
        routePath: 'create-collection',
        label: 'New collection',
      },
      edit: {
        routePath: 'edit-collection',
        label: 'View collection',
      }
    })

  }

})
