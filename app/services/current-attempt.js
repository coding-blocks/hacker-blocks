/**
 * Created by umair on 5/3/17.
 */

import Ember from 'ember';

const { inject: { service } } = Ember;

export default Ember.Service.extend({
  store: service(),

  async getCurrentAttempts(contestId) {
    const contestAttempt = this.get('store').peekRecord('ContestAttempt', {
      contestId
    })
    if (!contestAttempt) {
      return this.get('store').queryRecord('ContestAttempt', { contestId: contestId })
    }
    return contestAttempt
  }
});
