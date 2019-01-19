import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service (),

  didRender () {
    const question = this.get ('question'),
      quizState = this.get ('quizState'),
      choices = this.get ('question.choices')
    ;

    if (! quizState) {
      return
    }

    const state = quizState.find (q => q.questionId === question.get ('id'))

    if (! state) {
      return
    }

    let selected = choices.find (choice => choice.get ('id') === state.answerId)

    selected.set ('selected', true)
  },

  actions: {
    toggleChoice (choice) {
      let choices = this.get ('question.choices'),
        attempt = this.get ('attempt'),
        questionId = this.get ('question.id'),
        choiceId = choice.get ('id'),
        store = this.get ('store')
      ;

      choices.map (choice => {
        if (choice.id === choiceId) {
          choice.set ('selected', (! choice.get ('selected')))
        }
        else {
          choice.set ('selected', false)
        }
      })

      store.queryRecord ('quiz-submission', {
        currentAttemptId: attempt.get ('id'),
        questionId 
      }).then (submission => {
        if (! submission) {
          return store.createRecord ('quiz-submission', {
            currentattemptId: attempt,
            questionId,
            answerId: choiceId
          }).save ()
        } else {
          return store.findRecord ('quiz-submission', submission.id)
            .then (qSubmission => {
              if (choice.get ('selected')) {
                qSubmission.set ('answerId', choiceId)
              } else {
                qSubmission.set ('answerId', null)
              }
              return qSubmission.save ()
            })
        }
      })

      this.get ('updateQuizState') (choice)
    }
  }
});
