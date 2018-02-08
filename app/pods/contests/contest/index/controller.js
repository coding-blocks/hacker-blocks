import Ember from 'ember';

export default Ember.Controller.extend({
  selectedTag:"All",
  actions: {
    redirectToContest(model) {
      //this.get('target.router').refresh()
      //this.transitionToRoute('contests.contest.contest-result', model.contest.id);
    },
    updateSelection(tag) {
      this.set('selectedTag',tag);
    }
  }
});
