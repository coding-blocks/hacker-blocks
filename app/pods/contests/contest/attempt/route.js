import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service('session'),
  currentContest: Ember.inject.service('current-contest'),
  breadCrumb: {
    title: 'Attempt'
  },
  model() {
    return this.get('currentContest').getContest()
  }
});
