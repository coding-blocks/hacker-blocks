import Ember from 'ember';

export default Ember.Route.extend({
  breadCrumb: {
    title: 'Problem X'
  },
  model(params) {
    return {problem_id: params.problem_id};
  }
});
