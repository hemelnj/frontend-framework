import Component from '@ember/component';
import Service, {inject as service} from '@ember/service';


export default Component.extend({


  init(){
    this._super(...arguments);
  },

  actions:{
    onChangeSearchCriteria(value){
      console.log('message-onChangeSearchCriteria', value);
    },

    getSearchValue(value){
      console.log('message-onChangeSearchValue', value);
    }
  }

})
