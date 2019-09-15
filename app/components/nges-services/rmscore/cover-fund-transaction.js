import Component from '@ember/component';
import Service, {inject as service} from '@ember/service';


export default Component.extend({


  init(){
    this._super(...arguments);


    console.log('message', ' cover fund page');



    this.set('serviceActionableRoute', {
      create: {
        routePath: 'create-cover-fund-transaction',
        label: 'New Cover Fund',
      },
      edit: {
        routePath: 'edit-collection',
        label: 'View collection',
      }
    })

  }

})
