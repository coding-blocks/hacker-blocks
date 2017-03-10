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
    } else if (query.weekly) {
      delete query.weekly;
      return `${this._super(...arguments)}/weekly/${query.problem_id}`;
    }
    return this._super(...arguments);
  },
  authorizer: 'authorizer:custom'
});
