import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    redirectToContest(model) {
      //this.get('target.router').refresh()
   this.transitionToRoute('contests.contest.contest-result', model.contest.id);  
  }

  }
});