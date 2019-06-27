import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | welcome/application-loader/panel-loader/module-loader/service-holder-loader/menu-template-loader/submenu-template-loader', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:welcome/application-loader/panel-loader/module-loader/service-holder-loader/menu-template-loader/submenu-template-loader');
    assert.ok(route);
  });
});
