import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | welcome/service-loader/service-item-loader/item-template-loader', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:welcome/service-loader/service-item-loader/item-template-loader');
    assert.ok(route);
  });
});
