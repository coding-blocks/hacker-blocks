import Ember from 'ember';

export default Ember.Route.extend({
  currentAttemptService: Ember.inject.service('current-attempt'),

  model (params) {
    const quiz = this.modelFor ('contests.contest.quiz'),
      currentAttempt = this.get ('currentAttemptService').getCurrentAttempts(quiz.get ('contest').id)
    ;

    return Ember.RSVP.hash ({
      currentAttempt: currentAttempt,
      quiz: quiz
    })
  },

  afterModel (params) {
    if (! params.currentAttempt) {
      this.transitionTo ('contests.contest', params.quiz.get ('contest').id)
    }
  }
});
