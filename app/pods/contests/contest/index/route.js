import Ember from 'ember';

export default Ember.Route.extend({
  breadCrumb: {
    title: 'Contest'
  },
  model() {
    return this.modelFor('contests.contest');
  },
  afterModel(model) {
  }
});
