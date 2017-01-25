import DS from 'ember-data';
import env from '../../config/environment';

export default DS.JSONAPIAdapter.extend({
  namespace: 'api',
  host: env.hostUrl,
  urlForQueryRecord(query) {
    if (query.me) {
      delete query.me;
      return `${this._super(...arguments)}/me`;
    }
    return this._super(...arguments);
  }
});
