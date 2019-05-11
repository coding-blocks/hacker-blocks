import Ember from 'ember';
const { inject: { service } } = Ember;
import { task, timeout } from 'ember-concurrency';
import Moment from 'npm:moment'

export default Ember.Controller.extend({
  session:     service('session'),
  currentUser: service('current-user'),
  currentAttempt: service('current-attempt'),
  serverTime: service('server-time'),
  started: false,

  init() {
    const wait = (Math.random()*100) % 60
    this.set('wait', wait)
    this.set('start', this.get('serverTime').getUnixTime())
    this.get('tickTask').perform()
  },

  tickTask: task(function *() {
    while (this.get('serverTime').getUnixTime() < this.get('start') + this.get('wait')) {
      const left = Math.floor(this.get('start') + this.get('wait') - this.get('serverTime').getUnixTime())
      this.set('left', left)
      yield timeout(1000)
    }
    this.set('started', true)
  }),

  attemptContestTask: task(function *(contestId) {
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
  }).drop()
});
