import Ember from 'ember';

export default Ember.Controller.extend({
    
    totalScore: Ember.computed('model',function() {
       var sum  = 0;
       this.get('model.submissionModel').forEach(submission=>{
          sum += parseInt(submission.get('score'));
       });
       return sum;
  })
});
