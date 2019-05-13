/**
 * Created by umair on 5/3/17.
 */

import Ember from 'ember';
import Moment from 'npm:moment';

const { inject: { service } } = Ember;

export default Ember.Service.extend({
  store: service(),
  serverTime: service('server-time'),

  async getCurrentAttempts(contestId) {
    const contestAttempt = this
      .get('store')
      .peekAll('ContestAttempt')
      .find(attempt => attempt.get('contestId') == contestId && attempt.get('endTime') > this.get('serverTime').getUnixTime())
    if (!contestAttempt) {
      return this.get('store').queryRecord('ContestAttempt', { contestId: contestId })
    }
    return Promise.resolve(contestAttempt)
  }
});
