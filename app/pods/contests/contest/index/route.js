import Ember from 'ember';
import Env from '../../../../config/environment';

const { inject: { service }, Route } = Ember;

export default Ember.Route.extend({
  routing: service('-routing'),
  currentAttemptService: service('current-attempt'),
  currentUser: service('current-user'),
  breadCrumb: {
    title: 'Contest'
  },
  model() {
    let {contest} = this.modelFor('contests.contest');
    return Ember.RSVP.hash({
      contest: contest,
      currentAttempt: this.get('currentAttemptService').getCurrentAttempts(contest.id),
      leaderboard: this.get('store').query('submission',
        {contest_id: contest.id, leaderboard: true, contest: true }),
    });
  },
  setupController: function (controller, model) {
    this._super(controller, model);

    let contest = model.contest;
    let contestId = contest.get('id');
    let authHeaders = this.get('currentUser').getAuthHeaders();

    $.ajax({
      url: Env.apiEndpoint + '/api/submissions/submissionCount',
      type: 'GET',
      headers: authHeaders,
      data: { contestId: contestId },
      accepts: 'application/json',
      success: function (data) {
        controller.set('submissionCount', data[0].count);
      },
      error: function () {
        controller.set('submissionCount', 0);
      }
    });
  },
  afterModel(model, transition) {
    const { currentAttempt, contest } = model;

    if ( Ember.isNone(contest.get('duration')) ) {
      return
    }

    if (currentAttempt.id === "0")  {
      this.transitionTo('contests.contest.attempt', model.contest.id)
    }
  }
});
