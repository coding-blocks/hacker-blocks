import Ember from 'ember';

export default Ember.Controller.extend ({
  queryParams: ['q'],
  store: Ember.inject.service (),
  q: 1,
  quizState: null,
  answerTimestamp: Date.now (),
  lastQuestionChange: Date.now (),
  notifications: Ember.inject.service ('toast'),

  questionIds: Ember.computed ('model.quiz', function () {
    return this.get ('model.quiz').hasMany ('questions').ids ()
  }),

  currentQuestion: Ember.computed ('q', function () {
    const currentQuestionIndex = this.get ('q') - 1
    this.set ('lastQuestionChange', Date.now ())
    return this.store.findRecord ('question', this.get ('questionIds')[currentQuestionIndex])
  }),

  lastQuestion: Ember.computed ('q', function () {
    return (this.get ('q') === this.get ('questionIds').length)
  }),

  firstQuestion: Ember.computed ('q', function () {
    return (this.get ('q') === 1)
  }),

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
    previousQuestion () {
      if (this.get ('firstQuestion')) {
        return
      }

      this.set ('q', this.get ('q') - 1)
    },

    nextQuestion () {
      if (this.get ('lastQuestion')) {
        return
      }

      this.set ('q', this.get ('q') + 1)
    },

    restoreState () {
      const currentQuizAttempt = this.get ('model.currentQuizAttempt'),
        store = this.get ('store')
      ;

      store.query ('quiz-submission', {
        currentAttemptId: currentQuizAttempt.id
      })
        .then (submissions => {
          this.set ('quizState', submissions.map (submission => ({
            questionId: submission.get ('questionId'),
            answerId: submission.get ('answerId')
          })))
        })
    },

    updateQuizState (choice) {
      const currentQuestion = this.get ('currentQuestion'),
        quizState = this.get ('quizState'),
        answerId = (choice.get ('selected')) ? choice.get ('id') : null
      ;

      if (answerId) {
        localStorage.setItem (`review-${currentQuestion.get ('id')}`, false)
      }

      let oldState = quizState.find (q => (q.questionId === currentQuestion.get ('id')))

      if (! oldState) {
        quizState.push ({
          questionId: currentQuestion.get ('id'),
          answerId: answerId,
          review: false
        })
      }
      else {
        oldState.answerId = answerId
        oldState.review = false
      }

      this.set ('answerTimestamp', Date.now ())
    },

    redirectToContest () {
      // this.transitionToRoute('contests.contest', model.contest.id);
    },

    goToQuestion (index) {
      this.set('q', index)
    },

    changeQuestion (index) {
      this.incrementProperty('q', index)
    },

    markForReview () {
      let question = this.get ('currentQuestion'),
        id = question.get ('id')
      ;

      question.set ('review', (! question.get ('review')))

      localStorage.setItem (`review-${id}`, question.get ('review'))

      this.set ('answerTimestamp', Date.now ())
    },

    submitQuiz () {
      const currentQuizAttempt = this.get ('model.currentQuizAttempt'),
        store = this.get ('store'),
        toast = this.get ('notifications'),
        questionIds = this.get ('questionIds'),
        contest = this.get('model.quiz.contest'),
        quizzes = contest.get('quizzes').toArray(),
        problemCount = contest.get('problems.length'),
        attachments = contest.get('attachments').toArray()
      ;
      store.findRecord ('quiz-attempt', currentQuizAttempt.id)
        .then (attempt => {
          attempt.set ('result', {})
          return attempt.save ()
        })
        .then (() => {
          questionIds.map (id => {
            localStorage.removeItem (`review-${id}`)
          })
          this.set ('quizState', null)
          this.get ('notifications').info ('Test Successfully Submitted!')
          if (quizzes.length === 1 && (! problemCount) && attachments.length === 0) {
            return this.transitionToRoute('contests.index')
          } else {
            return this.transitionToRoute('contests.contest', contest.id)
          }
        })
        .catch (error => {
          console.error (error)
          toast.error ('Could not save test, please check your network connection!')
        })
    }
  }
})
