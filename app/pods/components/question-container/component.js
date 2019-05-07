import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service (),

  didRender () {
    const question = this.get ('question'),
      quizState = this.get ('quizState'),
      choices = this.get ('question.choices')
    ;

    const questionContainer = document.querySelector ('.questions-container')

    if (window.MathJax && questionContainer) {
      Ember.run.later (_ => MathJax.Hub.Queue(["Typeset", MathJax.Hub, questionContainer]))
    }

    if (! quizState) {
      return
    }

    const state = quizState.find (q => q.questionId === question.get ('id'))

    if (! state) {
      return
    }

    let selected = choices.find (choice => choice.get ('id') === state.answerId)

    selected && selected.set ('selected', true)
  },

  async didReceiveAttrs() {
    if (this.get('question.id')) {
      const questionId = this.get('question.id')
      const currentAttemptId = this.get('attempt.id')
      const submission = await this.get('store').queryRecord('quiz-submission', {
        currentAttemptId,
        questionId
      })
      this.set('submission', submission)
    }
    this._super(...arguments)
  },

  actions: {
    async toggleChoice (choice) {
      let choices = this.get ('question.choices'),
        attempt = this.get ('attempt'),
        questionId = this.get ('question.id'),
        choiceId = choice.get ('id'),
        store = this.get ('store')
      ;

      choices.map (c => {
        if (c.id === choiceId) {
          c.set ('selected', (! c.get ('selected')))
        }
        else {
          c.set ('selected', false)
        }
      })

      const submission = this.get('submission')
      if (!submission) {
        const submission = await store.createRecord ('quiz-submission', {
          currentattemptId: attempt,
          questionId,
          answerId: choiceId
        }).save()
        this.set('submission', submission)
      } else {
        if (choice.get('selected')) {
          submission.set('answerId', choiceId)
        } else {
          submission.set('answerId', null)
        }
        await submission.save()
      }

      this.get ('updateQuizState') (choice)
    }
  }
});
