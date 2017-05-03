/**
 * Created by umair on 5/3/17.
 */

import Ember from 'ember';
import Env from '../config/environment';

const { inject: { service }, Route } = Ember;

export default Ember.Service.extend({
  session:     service('session'),
  getCurrentAttempts(contestId) {
    let userId = this.get('session').get('data').authenticated.user_id
    return Ember.$.getJSON(
      `${Env.apiEndpoint}/api/contest_attempts/${contestId}`,
      { userId: userId }
    );
  }
});
