import Ember from 'ember';

export default Ember.Route.extend({
  model () {
    let contest = this.modelFor('contests.contest').contest;
    let unlockedTestcase = null;
    let problem = this.modelFor('contests/contest/problem').problem;
    unlockedTestcase = this.get ('store').queryRecord ('unlocked_testcase' , { p_id: problem.id, contest_id: contest.id })
      .catch ((e) => (console.log (e)))

    return Ember.RSVP.hash({
      unlockedTestcase: unlockedTestcase,
      contest: contest,
      problem: problem
    });
  },

  actions: {
    testcaseUnlocked () {
      this.refresh ()
    }
  }
});
