import Route from '@ember/routing/route';

export default Route.extend({
  beforeModel() {
    this.replaceWith('login');

    //console.log('message', ' loading index page');

  }
});
