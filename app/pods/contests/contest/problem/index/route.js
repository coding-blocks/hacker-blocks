import Ember from 'ember';

const { inject: { service } } = Ember;

var lang_codes = {
  "c": "C",
  "cpp": "C++",
  "py2": "Python",
  "java": "Java"
};

export default Ember.Route.extend({
  session: Ember.inject.service('session'),
  currentAttemptService: service('current-attempt'),
  breadCrumb: {
    title: 'Problem'
  },
  model() {
    let contest = this.modelFor('contests.contest').contest;
    let problem_id = this.modelFor('contests/contest/problem').problem_id;
    return Ember.RSVP.hash({
      lang_codes: lang_codes,
      problem: this.get('store').queryRecord('problem', {problem_id, contest_id: contest.id}),
      contest: contest,
      leaderboard: this.get('store').query('submission', {contest_id: contest.id, problem_id : problem_id, leaderboard: true}),
      currentAttempt: this.get('currentAttemptService').getCurrentAttempts(contest.id)
    });
  },
  afterModel(model, transition) {
    const { currentAttempt, contest } = model;

    if ( Ember.isNone(contest.get('duration')) ) {
      return
    }

    if ( Ember.isNone(currentAttempt.data) ) {
      this.transitionTo('contests.contest.attempt', model.contest.id)
    }
  }
});
