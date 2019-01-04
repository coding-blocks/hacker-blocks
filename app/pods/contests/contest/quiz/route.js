import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service('session'),
  notifications: Ember.inject.service ('toast'),

  beforeModel (transition) {
    let session = this.get ('session'),
      notifications = this.get ('notifications'),
      store = this.get ('store')
    ;

    if (! session.get ('isAuthenticated')) {
      transition.abort ()
      notifications.error ('You must be logged in to view that!')

      this.transitionTo ('contests.index')
    }

    return store.queryRecord ('quiz-attempt', {
      quizId: transition.params['contests.contest.quiz'].quiz_id,
      contestId: transition.params['contests.contest'].contest_id,
      custom: {
        ext: 'url',
        url: 'currentAttempt'
      }
    })
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
