import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service('session'),
  notifications: Ember.inject.service ('toast'),
  currentContest: Ember.inject.service('current-contest'),

  beforeModel (transition) {
    const session = this.get ('session')
    const notifications = this.get ('notifications')

    if (! session.get ('isAuthenticated')) {
      transition.abort ()
      notifications.error ('You must be logged in to view that!')

      this.transitionTo ('contests.index')
    }
  },

  async model (params) {
    const store = this.get ('store')
    const contest = this.get('currentContest').getContest()
    const quiz = await store.findRecord('quiz', params.quiz_id, {reload: true})
    quiz.set('contest', contest)

    return quiz
  }
});
