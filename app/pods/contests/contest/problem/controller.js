import Ember from 'ember';

export default Ember.Controller.extend({
  attemptDuration: Ember.computed('contest.endTime', 'contest.duration', 'currentAttempt', function () {
    const userStartedAt = this.get('currentAttempt.startTime')
    const duration = this.get('contest.duration');
    const contestStartTime = this.get('contest.startTime')
    const contestEndTime = this.get('contest.endTime')

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
    redirectToContest (model) {
      this.transitionToRoute('contests.contest.contest-result', model.contest.id);
    }
  }
});
