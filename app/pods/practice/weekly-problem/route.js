import Ember from 'ember';

export default Ember.Route.extend({
  breadCrumb: {
    title: 'Problem'
  },
  model(params) {
    return {p_id: params.problem_id};
  }
});
