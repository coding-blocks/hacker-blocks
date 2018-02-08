import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    redirectToContest (model) {
      this.transitionToRoute('contests.contest.contest-result', model.contest.id);
    }
  }
});
