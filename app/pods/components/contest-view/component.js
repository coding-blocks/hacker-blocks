import Ember from 'ember';

export default Ember.Component.extend({
   didReceiveAttrs() {
    this._super(...arguments);
    const currentContest = this.get('contest');
     var presentDate = Math.floor(new Date().valueOf() / 1000);
     if (currentContest.get('startTime') <= presentDate && currentContest.get('endTime') >= presentDate) {
           this.set('active',true);
        } else if (currentContest.get('startTime') > presentDate) {
           this.set('active',false); 
        } else {
           this.set('active','neither');
        }   
  }
  
});
