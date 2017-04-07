import Ember from 'ember';

export default Ember.Controller.extend({
   liveReload:Ember.computed('startTime',function(){
    console.log(startTime);
   }) 
   
});
