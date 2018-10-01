/**
 * Created by umair on 5/3/17.
 */

import Ember from 'ember';

const { inject: { service } } = Ember;

export default Ember.Service.extend({
  session:     service('session'),
  store: service(),

  getCurrentAttempts(contestId) {
    let userId = this.get('session').get('data').authenticated.user_id
    let record = this.get('store').queryRecord('ContestAttempt', { contestId: contestId })
    return record
  }
});
