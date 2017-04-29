import Ember from 'ember';
import ENV from '../../../../config/environment';

const { inject: { service }, Component } = Ember;

export default Ember.Controller.extend({
  session:     service('session'),
  currentUser: service('current-user'),

  actions: {
    attemptContest (contestId) {
      const userId = this.get('session').get('data').authenticated.user_id;

      Ember.$.post(
        `${ENV.apiEndpoint}/api/contest_attempts/${contestId}`,
        { userId: userId },
        (result) => {
        }
      )
        .fail(() => console.log ("You done goofed"));
    }
  }
});
