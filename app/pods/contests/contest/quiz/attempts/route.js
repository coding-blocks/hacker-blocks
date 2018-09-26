import Ember from 'ember';

export default Ember.Route.extend({
  model (params) {
    let store = this.get ('store')
    let quiz = this.modelFor ('contests.contest.quiz')

    return Ember.RSVP.hash ({
      attempt: store.query ('quiz-attempt', {
        quizId: quiz.id
      }),
      quiz: quiz
    })
  }
});
