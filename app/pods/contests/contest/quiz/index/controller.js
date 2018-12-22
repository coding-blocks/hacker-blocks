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
    Ember.run.later (_ => this.send ('restoreState'))
  },

  actions: {
    restoreState () {
      const submission = [],
        store = this.get ('store'),
        quiz = this.get ('model.quiz'),
        contestId = window.location.pathname.slice(12, 15),
        questions = this.get ('model.quiz.questions').toArray (),
        currentQuizAttempt = this.get ('model.currentQuizAttempt')
      ;

      store.query ('quiz-submission', {
        currentAttemptId: currentQuizAttempt.id
      }).then (submissions => {
        submissions.map (submission => {
          let question = questions.findBy ('id', submission.get ('questionId'))
          question.get ('choices')
            .map (choice => {
              if (choice.get ('id') === submission.get ('answerId')) {
                choice.set ('selected', 'selected')
                question.set ('state', 'selected')
              }
            })
        })
      })

      questions.map (question => {
        question.set ('review', localStorage.getItem (`review-${question.id}`))
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
        choice = store.peekRecord ('choice', choiceId),
        currentQuizAttempt = this.get ('model.currentQuizAttempt')
      ;

      let selection = 'selected'
      ;

      if (choice.get ('selected') === 'selected') {
        selection = 'unselected'
      }

      store.queryRecord ('quiz-submission', {
        currentAttemptId: currentQuizAttempt.id,
        questionId 
      }).then (submission => {
        if (! submission) {
          store.createRecord ('quiz-submission', {
            currentattemptId: currentQuizAttempt,
            questionId,
            answerId: choiceId
          }).save ()
        } else {
          if (selection === 'selected') {
            store.findRecord ('quiz-submission', submission.id)
              .then (qSubmission => {
                qSubmission.set ('answerId', choiceId)
                qSubmission.save ()
              })
          } else {
            store.findRecord ('quiz-submission', submission.id, { backgroundReload: false })
              .then (qSubmission => {
                qSubmission.deleteRecord ();
                qSubmission.save ();
              })
          }
        }
      })

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
          console.log (contest)
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
