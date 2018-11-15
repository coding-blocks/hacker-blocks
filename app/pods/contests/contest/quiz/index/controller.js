import Ember from 'ember';

export default Ember.Controller.extend ({
  queryParams: ['q'],
  store: Ember.inject.service (),
  q: 1,
  notifications: Ember.inject.service ('toast'),
  attemptDuration: Ember.computed('model.quiz.contest.endTime', 'model.quiz.contest.duration', 'model.currentAttempt', function () {
    const userStartedAt = this.get('model.currentAttempt.startTime')
    const duration = this.get('model.quiz.contest.duration');
    const contestStartTime = this.get('model.quiz.contest.startTime')
    const contestEndTime = this.get('model.quiz.contest.endTime')

    if (userStartedAt < contestStartTime) {
      return 0
    }

    // If contest is over, give total duration (no marks)
    if (userStartedAt > contestEndTime) {
      return duration
    }

    // if time left < duration, only time left is available
    if (contestEndTime - userStartedAt < duration) {
      return contestEndTime - userStartedAt
    } else {
      return duration
    }


    //return (duration > timeLeft && timeLeft > 0) ? timeLeft: duration;
    //return startTime + duration < endTime ? duration : timeLeft 
  }),

  init () {
    this._super (...arguments)
    setTimeout (() => this.send ('restoreState'), 3000);
  },

  actions: {
    restoreState () {
      const submission = [],
        store = this.get ('store'),
        quiz = this.get ('model.quiz'),
        contestId = window.location.pathname.slice(12, 15),
        questions = this.get ('model.quiz.questions')
      ;

      questions.map (question => {
        question.set ('state', localStorage.getItem (`question-${question.id}`))
        question.set ('review', localStorage.getItem (`review-${question.id}`))

        question.get ('choices')
          .map (choice => {
            choice.set ('selected', localStorage.getItem (`choice-${choice.id}`))
          })
      })
    },

    redirectToContest () {
      this.transitionToRoute('contests.contest', model.contest.id);
    },
    goToQuestion (index) {
      this.set('q', index)
    },
    changeQuestion (index) {
      this.incrementProperty('q', index)
    },
    markForReview (question) {
      if (question.get ('review') === 'markForReview') {
        question.set ('review', 'unselected')
      } else {
        question.set ('review', 'markForReview')
      }

      localStorage.setItem (`review-${question.id}`, question.get (`review`))
    },
    toggleChoice (choiceId, questionId) {
      const store = this.get ('store'),
        question = store.peekRecord ('question', questionId),
        choice = store.peekRecord ('choice', choiceId)
      ;

      let selection = 'selected'
      ;

      if (choice.get ('selected') === 'selected') {
        selection = 'unselected'
      }

      localStorage.removeItem (`question-${question.id}`)

      question.get ('choices').map (choice => {
        choice.set ('selected', 'unselected')
        localStorage.removeItem (`choice-${choice.id}`)
      })

      choice.set ('selected', selection)
      question.set ('state', selection)

      localStorage.setItem (`question-${question.id}`, selection)
      localStorage.setItem (`choice-${choice.id}`, selection)
    },

    // Fixme
    submitQuiz (quizId) {
      const submission = [],
        store = this.get ('store'),
        quiz = this.get ('model.quiz'),
        contestId = window.location.pathname.slice(12, 15),
        questions = this.get ('model.quiz.questions')
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
          this.get ('notifications').info ('Test Successfully Submitted!')
          return this.transitionToRoute ('contests.index')
        })
    }
  }
})
