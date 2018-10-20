import Ember from 'ember';

export default Ember.Controller.extend ({
  store: Ember.inject.service (),

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
  actions: {
    redirectToContest () {
      this.transitionToRoute('contests.contest', model.contest.id);
    },

    toggleChoice (choiceId, questionId) {
      const store = this.get ('store'),
        question = store.peekRecord ('question', questionId),
        choice = store.peekRecord ('choice', choiceId)
      ;

      question.get ('choices').map (choice => {
        choice.set ('selected', 'unselected')
      })

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
          return this.transitionToRoute ('contests.contest', contestId)
        })
    }
  }
})
