import config from 'frontend-engine/config/environment';
import DS from 'ember-data';

export default DS.JSONAPIAdapter.extend({
  host: config.NGES_SERVICE_HOSTS.MOCK_SERVICE_HOST
});
