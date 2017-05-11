import Ember from 'ember';
import ENV from '../../../../config/environment';

const { inject: { service }, Component } = Ember;

export default Ember.Controller.extend({
  session:     service('session'),
  currentUser: service('current-user'),

  checkAttempts() {
    return new Promise((resolve, reject) => {

    });
  },

  init() {
    console.log("controller init()");
  },

  actions: {
    attemptContest (contestId) {
      const userId = this.get('session').get('data').authenticated.user_id;

      this
        .get('store')
        .createRecord('ContestAttempt', { contestId: contestId })
        .save()
        .then((result) => {
          if (result.data.startTime !== 0) {
            this.transitionToRoute('contests.contest', contestId);
          } else {
            this.set('error', 'You can\'t attempt this contest. You may have reached your max possible attempts on this contest.');
          }
        })
        .catch((error) => {
            this.set('error', 'You can\'t attempt this contest. You may have reached your max possible attempts on this contest.');
        })
    }
  }
});
