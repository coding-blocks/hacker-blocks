import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';
// import ENV from '../../../../../../config/environment'
const { inject: { service } } = Ember

export default Ember.Route.extend({
  currentAttemptService: service('current-attempt'),
  api: service(),

  queryParams: {
    q: {
      replace: true,
      refreshModel: true
    }
  },

  contestDurationUpdateTask: task(function *(contest) {
    while (true) {
      yield timeout(60000)
      const resp = yield this.get('api').request(`http://localhost:3000/api/contests/${contest.id}/duration`)
      contest.set('duration', resp.duration)
    }
  }),
  contestDurationUpdateTaskInstance: null,

  async model ({q}) {
    const quiz = this.modelFor ('contests.contest.quiz')
    const { contest } = this.modelFor ('contests.contest')
    const currentContestAttempt = this.get ('currentAttemptService').getCurrentAttempts(quiz.get('contest.id'))
    const currentQuizAttempt = await this.store.queryRecord ('quiz_attempt', {
      quizId: quiz.id,
      contestId: contest.id,
      custom: {
        ext: 'url',
        url: 'currentAttempt'
      }
    })

    const questionSubmissions = this.store.query('quiz-submission', {
      'currentAttemptId': currentQuizAttempt.id
    })

    const questionIds = quiz.hasMany ('questions').ids ()
    const question = this.store.findRecord ('question', questionIds[q ? q-1 : 0])


    return Ember.RSVP.hash ({
      quiz,
      contest,
      currentContestAttempt,
      currentQuizAttempt,
      questionSubmissions,
      question
    })
  },

  setupController(controller, model) {
    controller.set('currentQuizAttempt', model.currentQuizAttempt)
    controller.set('currentContestAttempt', model.currentContestAttempt)
    controller.set('quiz', model.quiz)
    controller.set('contest', model.contest)
    controller.set('questionSubmissions', model.questionSubmissions)
    controller.set('currentQuestion', model.question)
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

  renderTemplate() {
    if (this.controller.get('currentContestAttempt')) {
      const contest = this.controller.get('contest')
      this.set(
        'contestDurationUpdateTaskInstance', 
        this.get('contestDurationUpdateTask').perform(contest)
      )
    }
    return this._super(...arguments)
  },

  deactivate() {
    if (this.controller.get('currentContestAttempt')) {
      this.get('contestDurationUpdateTaskInstance').cancel()
    }
  },

  actions: {
    error(err) {
      console.error(err)
    }
  }
});
