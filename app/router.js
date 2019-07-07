import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function () {
  document.title = config.APP.appTitle;


  this.route('login');
  this.route('lab');
  this.route('security-login');
  this.route('registration');

  this.route('welcome', {path: '/'}, function () {

    this.route('application-loader', {path: ':application_code'}, function () {
      this.route('panel-loader', {path: ':panel_code'}, function () {
      this.route('module-loader', {path: ':module_code'}, function () {

          this.route('service-holder-loader', {path: ':service_holder_code'}, function () {
            this.route('menu-template-loader', {path: ':menu_template_code'}, function () {
              this.route('submenu-template-loader', {path: ':submenu_template_code'}, function () {
                this.route('submenu-detail-template-loader', {path: ':submenu_detail_template_code'});
              });
            });
          });


        });
      });


    });
  });

  this.route('not-found', {path: '/*wildcard'});
  this.route('forget-password');
  this.route('add-new-password');
  this.route('update-password');
});

export default Router;
