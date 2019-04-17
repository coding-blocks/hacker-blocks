import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service (),
  questions: null,

  didReceiveAttrs () {
    this._super (...arguments)

    let quizState = this.get ('quizState'),
      questionIds = this.get ('questionIds')
    ;

    this.set ('questions', questionIds.map (questionId => {
      let question = { questionId, answerId: null, review: false }

      if (quizState) {
        quizState.map (attempt => {
          if (attempt.questionId === questionId) {
            question.answerId = attempt.answerId
          }
        })
      }

      if (localStorage.getItem (`review-${questionId}`) === 'true') {
        question.review = true
      }

      return question
    }))
  }
});
