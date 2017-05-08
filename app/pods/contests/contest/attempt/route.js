import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service('session'),
  breadCrumb: {
    title: 'Attempt'
  },
  model() {
    return this.modelFor('contests.contest').contest;
  }
});
