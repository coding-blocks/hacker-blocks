import Ember from 'ember';
const { inject: { service }, Route } = Ember;

export default Ember.Route.extend ({
  session: service ('session'),

  breadCrumb: {
    title: 'Leaderboard'
  },

  model () {
    let { contest } = this.modelFor ('contests.contest')

    let userId = this.get ('session.data.authenticated.user_id')

    return contest
  }
})
