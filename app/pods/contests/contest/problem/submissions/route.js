import Ember from 'ember';

export default Ember.Route.extend({
  breadCrumb: {
    title: 'My Submissions'
  },
  model() {
    var id = this.modelFor('contests.contest.problem').problem_id;
    return this.get('store').query('submission', {problem_id : id});
  }
});
