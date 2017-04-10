import Ember from 'ember';
import moment from 'moment';
export default Ember.Route.extend({
     model(params) {
    let contest = this.get('store').findRecord('contest', params.contest_id);
    // contest.then(function(con){
    //    console.log(con.get('name'));
    // });
    return Ember.RSVP.hash({
      contest: contest
    });
  }
});
