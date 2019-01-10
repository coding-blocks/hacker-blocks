import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    openIfUnlocked (level, contest) {
      if (level.get ('unlocked')) {
        this.transitionToRoute ('contests.contest', contest.id)
      }
    }
  }
});
