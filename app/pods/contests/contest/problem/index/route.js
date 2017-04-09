import Ember from 'ember';

var lang_codes = {
  "c": "C",
  "cpp": "C++",
  "py2": "Python",
  "java": "Java"
};

export default Ember.Route.extend({
  session: Ember.inject.service('session'),
  breadCrumb: {
    title: 'Problem'
  },
  model() {
    let contest_id = this.modelFor('contests.contest').id;
    let problem_id = this.modelFor('contests/contest/problem').problem_id;
    return Ember.RSVP.hash({
      lang_codes: lang_codes,
      problem: this.get('store').queryRecord('problem', {problem_id, contest_id}),
      contestId: contest_id,
      leaderboard: this.get('store').query('submission', {contest_id, problem_id : problem_id, leaderboard: true})/*
      submissions: this.get('store').query('submission', {problem_id : problem_id, user_id: userId}),
      */
    }).then(result => {
      console.log(result.problem);
      console.log("derp", result.problem.get('meta'));
      return result;
    });
  }
});
