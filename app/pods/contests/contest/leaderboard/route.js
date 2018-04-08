import Ember from 'ember';
const { inject: { service }, Route } = Ember;

export default Ember.Route.extend ({
  session: service ('session'),

  breadCrumb: {
    title: 'Leaderboard'
  },

  beforeModel (transition) {
    // QuickFix: Don't show leaderboards for certain contests.
    let { contest } = this.modelFor ('contests.contest')

    if (! contest.get ('showLeaderboard')) {
      return transition.abort ()
    }
  },

  model () {
    let { contest } = this.modelFor ('contests.contest')

    let userId = this.get ('session.data.authenticated.user_id')

    return contest
  }
})
