import Ember from 'ember';

export default Ember.Route.extend({
  breadCrumb: {
    title: 'Leaderboard'
  },
  ajax: Ember.inject.service(),
  model() {
    var id = this.modelFor('contests.contest.problem').problem_id;
    return this.get('store').query('submission', {problem_id : id, leaderboard: true});
  }
});
