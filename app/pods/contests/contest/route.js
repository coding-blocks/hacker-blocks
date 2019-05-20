import Ember from 'ember';
import config from 'hack/config/environment';

const { inject: { service } } = Ember;

export default Ember.Route.extend({
  currentContest: service('current-contest'),
  session: service(),

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
      if (!this.get('session.isAuthenticated')) {
        const redirectionPath = window.location.pathname.replace(/^\/|\/$/g, '');
        localStorage.setItem('redirection-path', redirectionPath);
        window.location = "https://account.codingblocks.com/oauth/authorize?" +
        "response_type=code" +
        "&client_id=" + config.oneauthClientId +
        "&redirect_uri=" + config.publicUrl
        return
      }
      const contestId = transition.params['contests.contest'].contest_id
      this.transitionTo('contests.denied', contestId)
    }
  }
});
