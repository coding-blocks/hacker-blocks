import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    redirectToContest(model) {
      //this.get('target.router').refresh()
   this.transitionToRoute('contests.contest.contest-result', model.contest.id);
  },
  refreshModel(){
      var model = this.get('model');
      var problem_id = model.problem.id;
      var contest_id = model.contest.id;
      this.get('store').queryRecord('problem', {problem_id, contest_id: contest_id}).then(function(fetchedProblem){
        this.set('model.problem', fetchedProblem);
      });
    }

  }
});
