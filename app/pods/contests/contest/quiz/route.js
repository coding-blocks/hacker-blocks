import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service('session'),
  notifications: Ember.inject.service ('toast'),

  beforeModel (transition) {
    const session = this.get ('session')
    const notifications = this.get ('notifications')

    if (! session.get ('isAuthenticated')) {
      transition.abort ()
      notifications.error ('You must be logged in to view that!')

      this.transitionTo ('contests.index')
    }
  },

  model (params) {
    let store = this.get ('store')
    let { contest } = this.modelFor ('contests.contest');

    let quiz = store.findRecord ('quiz', params.quiz_id, { reload: true })
      .then (quiz => {
        quiz.set ('contest', contest)

        return quiz
      })

    return quiz
  }
});
