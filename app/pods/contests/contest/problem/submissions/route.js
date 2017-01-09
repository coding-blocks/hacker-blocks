import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    var problem = this.modelFor('contests.contest.problem');
    return this.get('store').query('submission', {problem_id : problem.id});
  }
});
