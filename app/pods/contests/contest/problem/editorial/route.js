/**
 * Created by siddharth on 28/11/17.
 */
import Ember from 'ember';

export default Ember.Route.extend({
  model(){
    let contest = this.modelFor('contests.contest').contest;
    let editorial = null;
    let problem_id = this.modelFor('contests/contest/problem').problem_id;
    if(contest.get('isFinished') == true) {
      editorial = this.store.queryRecord('editorial' , {p_id:problem_id});
    }
    return Ember.RSVP.hash({
      editorial:editorial,
      contest:contest
    });
  }

});
