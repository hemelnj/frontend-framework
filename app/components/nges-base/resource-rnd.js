import Component from '@ember/component';
import {inject as service} from '@ember/service';


let PAGINATE_LIMIT = 5;

export default Component.extend({

  store: service(),
  notifier: service(),
  appWelcome: service('nges-core/app-welcome'),
  appConfiguration: service('app-configuration'),
  serviceInitializer: service('nges-services/service-initializer'),
  init() {
    this._super(...arguments);


    let context = this;


    //this.set('paginatePage', [1,2,3,4,5]);
    this.set('pageNumber', 1);
    this.set('size', 10);


    let page = this.get('pageNumber');
    let size = this.get('size');
    this.getTableData(page, size);
  },

  actions: {
    onPreviousClick() {

      let updatePaginateForPreviousPage = (pageLimit) => {
        let array = this.get('paginatePages');
        if (array.length >= pageLimit) {
          let startItem = array.shift();           // get first page from array
          array.unshiftObject(startItem);        // added first page to array
          array.unshiftObject(startItem - 1);    // first item decrement and added
          array.pop();                           // remove one page from last
          this.set('paginatePages', array);      // update paginate view
        }
      };
      updatePaginateForPreviousPage(PAGINATE_LIMIT);

    },
    onNextClick() {

      let updatePaginateForNextPage = () => {
        let totalPaginatePages = this.get('totalPaginatePages');      // total page numbers
        let array = this.get('paginatePages');                        // paginate array
        let lastItem = array[array.length - 1];                       // get last index
        if (lastItem < totalPaginatePages) {                           // check for overflow
          array.pushObject(lastItem + 1);                             // added new page with increment
          array.shift();                                              // remove page from start
          this.set('paginatePages', array);                           // update view
        }
      };

      updatePaginateForNextPage();

    },
    onSelectedPage(value) {
      console.log('onSelectedPage', value);
      this.set('pageNumber', value);

      let page = value;
      let size = this.get('size');
      this.getTableData(page, size);
    },
    onSelectedEntries(value) {
      console.log('onSelectedEntries', value);
      this.set('size', value);

      let page = this.get('pageNumber');
      let size = value;
      this.getTableData(page, size);
    }
  },
  getTableData(page, size) {
    let context = this;

    //this.store.findRecord('nges-services/person', page, size, { reload: false })
    this.store.query('nges-services/person', {
      page: page,
      size: size,
    }).then(function (data) {
      context.set('person', data);

      let initializePagination = (totalRows) => {
        let numberOfPage = 0;
        if (size !== 0) {
          numberOfPage = totalRows / size;
          numberOfPage = Math.ceil(numberOfPage);
        }

        let array = [];
        for (let i = 1; i <= numberOfPage; i++) {
          if (i > PAGINATE_LIMIT) {
            break;
          }
          array.push(i);
        }

        context.set('paginatePages', array);
        context.set('totalPaginatePages', numberOfPage);
      };
      let totalRows = data.meta.totalCount;
      initializePagination(totalRows)

    });
  }

});
