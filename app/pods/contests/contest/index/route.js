import Ember from 'ember';
import Env from '../../../../config/environment';
export default Ember.Route.extend({
  breadCrumb: {
    title: 'Contest'
  },
  model() {
    let contest = this.modelFor('contests.contest');
    return Ember.RSVP.hash({
      contest: contest,
      leaderboard: this.get('store').query('submission',
        {contest_id: contest.id, leaderboard: true, contest: true })
    });
  },

  afterModel(model) {
  },
  setupController: function (controller, model) {
    this._super(controller, model);
    let contest = model.contest;
    let contestId = contest.get('id');
    $.ajax({
      url: Env.apiEndpoint + '/api/submissions/submissionCount',
      type: 'GET',
      data: { contestId: contestId },
      accepts: 'application/json',
      success: function (data) {
        controller.set('submissionCount', data[0].count);
      },
      error: function () {
         controller.set('submissionCount', 0);
      }
    });
  }
});
