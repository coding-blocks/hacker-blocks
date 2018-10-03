import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel (transition) {
    let store = this.get ('store'),
      competitionId = transition.params['competitions.view'].id,
      attempt = store.queryRecord ('CompetitionAttempt', {
        competitionId: competitionId,
        custom: {
          ext: 'url',
          url: 'current'
        }
      })
    ;

    attempt
      .then (attempt => {
        if (! attempt) throw new Error ('Competition Attempt Not Found!')
      })
      .catch (_ => {
        this.transitionTo ('competitions.overview', competitionId)
      })
  },

  model (params) {
    let store = this.get ('store')

    return store.findRecord ('competition', params.id, { reload:true })
  },

  afterModel (competition, transition) {
    competition.get ('contests').map (contest => this.get ('store').findRecord ('contest', contest.id))
  },

  setupController(controller, model){
    controller.set('competition', model);
  }
});
