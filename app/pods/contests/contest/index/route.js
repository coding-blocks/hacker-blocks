import Ember from 'ember';

export default Ember.Route.extend({
  breadCrumb: {
    title: 'Contest'
  },
  model() {
    return Ember.RSVP.hash({
      contest: this.modelFor('contests.contest'),
      leaderboard: this.get('store').query('submission', { contest_id: contest.contest_id, leaderboard: true, contest: true })
    });
  },

  afterModel(model) {
  }
});
