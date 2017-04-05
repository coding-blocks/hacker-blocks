import Ember from 'ember';

export default Ember.Route.extend({
  breadCrumb: {
    title: 'Contest'
  },
  model() {
    let contest = this.modelFor('contests.contest');
    return Ember.RSVP.hash({
      contest: contest,
      leaderboard: this.get('store').query('submission', { contest_id: contest.id, leaderboard: true, contest: true })
    });
  },

  afterModel(model) {
  }
});
