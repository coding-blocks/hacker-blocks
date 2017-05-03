import Ember from 'ember';

export default Ember.Route.extend({
  breadCrumb: {
    title: 'Attempt'
  },
  model() {
    return this.modelFor('contests.contest').contest;
  }
});
