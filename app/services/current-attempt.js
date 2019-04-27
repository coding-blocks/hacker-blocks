/**
 * Created by umair on 5/3/17.
 */

import Ember from 'ember';

const { inject: { service } } = Ember;

export default Ember.Service.extend({
  store: service(),

  getCurrentAttempts(contestId) {
    return this.get('store').queryRecord('ContestAttempt', { contestId: contestId }, {reload: true})
  }
});
