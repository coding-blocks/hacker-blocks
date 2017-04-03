import Ember from 'ember';

export default Ember.Controller.extend({
    submissionCount:Ember.computed('model', function() {
     const problems = this.get('model.problems');
     let count= 0;
     problems.forEach(el=>{
         count += parseInt( el.get('submitCount') );
     })

     return count;
  })
});
