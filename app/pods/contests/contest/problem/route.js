import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return {problem_id: params.problem_id};
  }
});
