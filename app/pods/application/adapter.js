import Ember from 'ember';
import DS from 'ember-data';
import env from '../../config/environment';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

export default DS.JSONAPIAdapter.extend(DataAdapterMixin, {
  namespace: 'api',
  host: env.apiEndpoint,
  urlForQueryRecord(query) {
    if (query.me) {
      delete query.me;
      return `${this._super(...arguments)}/me`;
    }
    return this._super(...arguments);
  },
  authorizer: 'authorizer:custom',
  findRecord: function (store, type, id, snapshot) {
    if (Ember.get(snapshot.adapterOptions, 'query')) {
      let adapterOptions = snapshot.adapterOptions;
      let url = this.buildURL(type.modelName, id, snapshot, 'findRecord');
      if (adapterOptions.query) {
        let query = adapterOptions.query;
        url += '?';
        for (let key in query) {
          if (query.hasOwnProperty(key)) {
            url += key + '=' + query[key];
            url += '&';
          }
        }
      }
      return this.ajax(url, 'GET', {weekly: true});
    } else {
      console.log("adapter else");
      this._super(...arguments);
    }
  }
});
