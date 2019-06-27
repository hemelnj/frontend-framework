import config from 'frontend-engine/config/environment';
import DS from 'ember-data';

export default DS.JSONAPIAdapter.extend({
  host: config.NGES_SERVICE_HOSTS.MOCK_SERVICE_HOST,

 /* beforeSend: function (xhr) {
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.setRequestHeader('authorization', 'Bearer ' + 'accessToken-sadhan');
  },*/


  ajaxOptions() {
    let hash = this._super(...arguments);
    let { beforeSend } = hash;

    hash.beforeSend = xhr => {
      xhr.setRequestHeader('content-type', 'application/json');
      xhr.setRequestHeader('authorization', 'Bearer ' + 'accessToken-sadhan');
    };
    return hash;
  },

});
