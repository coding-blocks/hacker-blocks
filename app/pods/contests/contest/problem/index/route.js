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
    let userId = this.get('session.data.authenticated.user_id');
    let problem_id = this.modelFor('contests/contest/problem').problem_id;
    return Ember.RSVP.hash({
      lang_codes: lang_codes,
      problem: this.get('store').findRecord('problem', problem_id),
      submissions: this.get('store').query('submission', {problem_id : problem_id, user_id: userId}),
      leaderboard: this.get('store').query('submission', {problem_id : problem_id, leaderboard: true})
    });
  }
});
