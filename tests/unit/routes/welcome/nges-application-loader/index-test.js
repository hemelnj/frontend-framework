import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | welcome/application-loader/index', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:welcome/application-loader/index');
    assert.ok(route);
  });
});
