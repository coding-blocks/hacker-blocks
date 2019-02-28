import Ember from 'ember';

export default Ember.Service.extend({
  setContest(contest){
    this.set('contest', contest)
  },
  getContest(){
    return this.get('contest')
  }
});
