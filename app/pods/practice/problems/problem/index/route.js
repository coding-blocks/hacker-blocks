import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service('session'),
  breadCrumb: {
    title: 'Problem'
  },
  model() {
    let contest = this.modelFor('practice-section.problems').contest;
    let problem_id = this.modelFor('practice-section.problems.problem').problem_id;
    return Ember.RSVP.hash({
      problem: this.get('store').queryRecord('problem', {problem_id, contest_id: contest.id}),
      contest: contest,
      leaderboard: this.get('store').query('submission', {contest_id: contest.id, problem_id : problem_id, leaderboard: true}),
    });
  }
});
