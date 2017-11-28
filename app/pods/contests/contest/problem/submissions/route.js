/**
 * Created by siddharth on 28/11/17.
 */
import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    let contest = this.modelFor('contests.contest').contest;
    let problem_id = this.modelFor('contests/contest/problem').problem_id;
    let problem = this.get('store').queryRecord('problem', {problem_id, contest_id: contest.id});
    return Ember.RSVP.hash({
      problem: problem,
      contest: contest,
      problem_id: params.problem_id
    });
  }
});
