import Ember from 'ember';
import DS from 'ember-data'
import Env from '../../../config/environment';
import config from '../../../config/environment';

const { inject: { service }, Route } = Ember;

export default Ember.Route.extend({
  toast: Ember.inject.service (),
  session: service('session'),
  currentContest: service('current-contest'),

  model (params) {
    let contestId = params.contest_id;
    this.get('currentContest').setContest(contestId)
    return Ember.RSVP.hash({
      contest: this.get('store').findRecord('contest', contestId, {reload: true})
    })
  },

  actions: {
    error (err, transition) {
      if (err instanceof DS.AdapterError) {
        transition.abort ()

        if (! this.get ('session.isAuthenticated')) {
          var redirectionPath = window.location.pathname;
          redirectionPath = redirectionPath.replace(/^\/|\/$/g, '');
          localStorage.setItem('redirection-path', redirectionPath);
          window.location = "https://account.codingblocks.com/oauth/authorize?" +
            "response_type=code" +
            "&client_id=2146237097" +
            "&redirect_uri=" + config.publicUrl

          return
        }

        this.transitionTo ('contests.denied', transition.params['contests.contest'].contest_id)
      } 
    }
  }
});
