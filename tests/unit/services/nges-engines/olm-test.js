import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | nges-engines/olm', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let service = this.owner.lookup('service:nges-engines/olm');
    assert.ok(service);
  });
});
