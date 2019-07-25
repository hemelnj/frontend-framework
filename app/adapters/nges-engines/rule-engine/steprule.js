import DS from 'ember-data';
import config from 'frontend-engine/config/environment';

export default DS.JSONAPIAdapter.extend({
  host: config.NGES_SERVICE_HOSTS.RULE_ENGINE_SERVICE_HOST

});
