import EmberObject from '@ember/object';
import AuthorizationMixin from 'frontend-engine/mixins/authorization';
import { module, test } from 'qunit';

module('Unit | Mixin | authorization', function() {
  // Replace this with your real tests.
  test('it works', function (assert) {
    let AuthorizationObject = EmberObject.extend(AuthorizationMixin);
    let subject = AuthorizationObject.create();
    assert.ok(subject);
  });
});
