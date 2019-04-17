import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service('session'),
  notifications: Ember.inject.service ('toast'),
  currentAttemptService: Ember.inject.service('current-attempt'),

  beforeModel (transition) {
    let session = this.get ('session'),
      notifications = this.get ('notifications')
    ;

    if (! session.get ('isAuthenticated')) {
      transition.abort ()
      notifications.error ('You must be logged in to view that!')

      return this.transitionTo ('contests.index')
    }

    return { }
  },

  model (params) {
    const store = this.get ('store')
    const { contest } = this.modelFor ('contests.contest')
    const quiz = store.findRecord ('quiz', params.quiz_id, { reload: true })
      .then (quiz => {
        quiz.set ('contest', contest)

        return quiz
      })

    const attempts = store.query ('quiz-attempt', { quiz_id: params.quiz_id })

    return Ember.RSVP.hash ({
      contest,
      quiz,
      attempts
    })
  }
});
