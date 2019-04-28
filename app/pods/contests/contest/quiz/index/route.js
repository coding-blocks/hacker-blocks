import Ember from 'ember';
const { inject: { service } } = Ember

export default Ember.Route.extend({
  currentAttemptService: service('current-attempt'),

  queryParams: {
    q: {
      replace: true
    }
  },

  model (params) {
    const quiz = this.modelFor ('contests.contest.quiz')
    const { contest } = this.modelFor ('contests.contest')
    const currentContestAttempt = this.get ('currentAttemptService').getCurrentAttempts(quiz.get('contest.id'))
    const currentQuizAttempt = this.store.queryRecord ('quiz_attempt', {
      quizId: quiz.id,
      contestId: contest.id,
      custom: {
        ext: 'url',
        url: 'currentAttempt'
      }
    })

    return Ember.RSVP.hash ({
      quiz,
      contest,
      currentContestAttempt,
      currentQuizAttempt
    })
  },

  setupController(controller, model) {
    controller.set('currentQuizAttempt', model.currentQuizAttempt)
    controller.set('currentContestAttempt', model.currentContestAttempt)
    controller.set('quiz', model.quiz)
    controller.set('contest', model.contest)
  },

  afterModel (params) {
    const contest = params.quiz.get ('contest'),
      duration = contest.get ('duration'),
      { currentContestAttempt } = params
    ;

    if (duration && (! currentContestAttempt)) {
      this.transitionTo ('contests.denied', contest.id)
    }
  },
  actions: {
    error(err) {
      console.error(err)
    }
  }
});
