import Component from '@ember/component';
import Service, {inject as service} from '@ember/service';


export default Component.extend({


  init(){
    this._super(...arguments);
    this.setSearchCriteria();
  },

  setSearchCriteria() {
    let data = [
      {
        id: 1,
        type: "criteria",
        attributes: {
          name: "Name"
        }
      },
      {
        id: 1,
        type: "criteria",
        attributes: {
          name: "Contact No"
        }
      },
    ];

    this.set("searchCriteria", data);
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
