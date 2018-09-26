import Ember from 'ember';

export default Ember.Controller.extend ({
  store: Ember.inject.service (),
  actions: {
    toggleChoice (choiceId, questionId) {
      const store = this.get ('store'),
        question = store.peekRecord ('question', questionId),
        choice = store.peekRecord ('choice', choiceId)
      ;

      if (choice.get ('selected') === 'selected') {
        choice.set ('selected', 'unselected')
      }
      else {
        choice.set ('selected', 'selected')
      }
    },

    // Fixme
    submitQuiz (quizId) {
      const submission = [],
        store = this.get ('store'),
        quiz = this.get ('model'),
        contestId = window.location.pathname.slice(12, 15),
        questions = this.get ('model.questions')
      ;

      questions.map (question => {
        let markedChoices = question
          .get ('choices')
          .filter (choice => choice.selected === 'selected')
          .map (c => c.id)

        if (markedChoices.length > 0) {
          submission.push ({
            id: question.id,
            markedChoices
          })
        }
      })

      store.findRecord ('contest', contestId)
        .then (contest => {
          return store.createRecord ('quizAttempt', {
            contest,
            quiz,
            submission
          }).save ()
        })
        .then (quizAttempt => {
          return this.transitionToRoute ('contests.contest.quiz.attempts.show', quiz.id, quizAttempt.id)
        })
    }
  }
})
