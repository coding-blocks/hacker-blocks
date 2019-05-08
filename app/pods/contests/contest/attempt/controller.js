import Ember from 'ember';

const { inject: { service } } = Ember;

export default Ember.Controller.extend({
  session:     service('session'),
  currentUser: service('current-user'),
  currentAttempt: service('current-attempt'),

  actions: {
    attemptContest (contestId) {
      const store = this.get('store')
      return this
        .get('currentAttempt')
        .getCurrentAttempts(contestId)
        .then(contestAttempt => {
          if (!contestAttempt) {
            return store
              .createRecord('ContestAttempt', { contestId: contestId })
              .save()
              .then((result) => {
                if (result.data.startTime && result.data.startTime !== 0) {
                  return this.transitionToRoute('contests.contest', contestId);
                }
              }).catch(err => {
                if (err.name !== "TransitionAborted") {
                  this.set('error', 'You can\'t attempt this contest. You may have reached your max possible attempts on this contest.');
                }
              })
          }
          return this.transitionToRoute('contests.contest', contestId);
        })
    }
  }
});
