import Ember from 'ember';

const { inject: { service } } = Ember;

export default Ember.Route.extend({
  currentContest: service('current-contest'),

  model (params) {
    const contestId = params.contest_id;
    const contest = this.get('store').findRecord('contest', contestId)
    return Ember.RSVP.hash({
      contest
    })
  },

  afterModel(model) {
    this.get('currentContest').setContest(model.contest)
  },

  actions: {
    error(error, transition) {
      const contestId = transition.params['contests.contest'].contest_id
      this.transitionTo('contests.denied', contestId)
    }
  }
});
