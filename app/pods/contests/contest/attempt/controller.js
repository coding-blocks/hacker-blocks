import Ember from 'ember';

const { inject: { service } } = Ember;

export default Ember.Controller.extend({
  session:     service('session'),
  currentUser: service('current-user'),

  actions: {
    attemptContest (contestId) {
      this
        .get('store')
        .createRecord('ContestAttempt', { contestId: contestId })
        .save()
        .then((result) => {
          if (result.data.startTime && result.data.startTime !== 0) {
            return this.transitionToRoute('contests.contest', contestId);
          }

          throw new Error ('MaxAttemptsExceeded')
        })
        .catch((error) => {
          console.log(error)
          Raven.captureException(error);
          this.set('error', 'You can\'t attempt this contest. You may have reached your max possible attempts on this contest.');
        })
    }
  }
});
