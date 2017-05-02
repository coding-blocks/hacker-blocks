import Ember from 'ember';
import Env from '../../../../config/environment';

const { inject: { service }, Route } = Ember;

export default Ember.Route.extend({
  routing: Ember.inject.service('-routing'),
  session:     service('session'),
  currentUserSer: service('current-user'),

  breadCrumb: {
    title: 'Contest'
  },

  model() {
    let contest = this.modelFor('contests.contest');
    let contestId = contest.id
    let userId = this.get('session').get('data').authenticated.user_id
    let currentAttempt = Ember.$.getJSON(
      `${Env.apiEndpoint}/api/contest_attempts/${contestId}`,
      { userId: userId }
    )

    return Ember.RSVP.hash({
      contest: contest,
      currentAttempt: currentAttempt,
      leaderboard: this.get('store').query('submission',
        {contest_id: contest.id, leaderboard: true, contest: true })
    });
  },

  afterModel(model, transition) {
    const { currentAttempt, contest } = model

    if ( Ember.isNone(contest.get('duration')) ) {
      return
    }

    if ( Ember.isNone(currentAttempt.data) ) {
      this.transitionTo('contests.contest.attempt', model.contest.id)
    }
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
