import Ember from 'ember';

export default Ember.Route.extend({
  breadCrumb: {
    title: 'Contest'
  },
  model() {
    let self = this;
    let contest = this.modelFor('contests.contest');
    let contestObj = this.get('store').findRecord('contest', contest.contest_id);
    contestObj.then(function (obj) {
      //hackckckck
      self.breadCrsumb.title = obj.get('name');
      $('#bcrumb-contest').text(self.breadCrumb.title);
    });
    let problems = this.get('store').query('problem', { contest_id: contest.contest_id });
    return Ember.RSVP.hash({
      problems,
      leaderboard: this.get('store').query('submission', { contest_id: contest.contest_id, leaderboard: true, contest: true }),
    });
  },

  afterModel(model) {
  }
});
