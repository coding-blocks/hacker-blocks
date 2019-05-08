import Ember from 'ember';
import Moment from 'npm:moment'
import DS from 'ember-data'

export default Ember.Controller.extend ({
  contestAttemptService: Ember.inject.service('current-attempt'),
  queryParams: ['q'],
  store: Ember.inject.service (),
  q: 1,
  quizState: null,
  answerTimestamp: Date.now (),
  lastQuestionChange: Date.now (),
  notifications: Ember.inject.service ('toast'),

  question: Ember.computed('q', function () {
    const currentQuestionIndex = this.get ('q') - 1
    return DS.PromiseObject.create({
      promise: this.store.findRecord ('question', this.get ('questionIds')[currentQuestionIndex])
    })
  }),

  currentQuestionSubmission: Ember.computed('quizQuestionSubmissions.[]', 'question.id', function () {
    return this.get('quizQuestionSubmissions').findBy('questionId', this.get('question.id'))
  }),

  lastQuestion: Ember.computed ('q', function () {
    return (this.get ('q') === this.get ('questionIds').length)
  }),

  firstQuestion: Ember.computed ('q', function () {
    return (this.get ('q') === 1)
  }),

  attemptDuration: Ember.computed('quiz.contest.endTime', 'quiz.contest.duration', 'currentContestAttempt', function () {
    const userStartedAt = this.get('currentContestAttempt.startTime')
    const duration = this.get('quiz.contest.duration');
    const contestStartTime = this.get('quiz.contest.startTime')
    const contestEndTime = this.get('quiz.contest.endTime')

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

    confirmSubmit () {
      $('#submissionConfirmation').modal ('show')
    },

    async updateQuestionSubmission (choiceId) {
      let submission = this.get('currentQuestionSubmission')
      if (!submission) {
        submission = await this.get('store').createRecord ('quiz-submission', {
          currentattemptId: this.get('currentQuizAttempt'),
          questionId: this.get('question.id'),
          answerId: choiceId
        }).save()
      } else {
        submission.set('answerId', choiceId)
        await submission.save()
      }
      this.set('quizQuestionSubmissions', this.get('store').peekAll('quiz-submission').filter(s => !!s.get('answerId')))
    },

    submitQuiz () {
      const currentQuizAttempt = this.get ('currentQuizAttempt'),
        store = this.get ('store'),
        toast = this.get ('notifications'),
        questionIds = this.get ('questionIds'),
        contest = this.get('quiz.contest'),
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

          store
            .peekAll ('choice')
            .toArray ()
            .map (choice => choice.set ('selected', false))

          this.set ('quizState', null)
          this.get ('notifications').info ('Test Successfully Submitted!')
          if (quizzes.length === 1 && (! problemCount) && attachments.length === 0) {
            return this.get('contestAttemptService').getCurrentAttempts(contest.id) 
              .then(contestAttempt => {
                if (!contestAttempt) return
                // stop the contest attempt
                return contestAttempt.save()
              }).then(() => {
                return this.transitionToRoute('contests.index')
              })
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
