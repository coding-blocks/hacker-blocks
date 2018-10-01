import Ember from 'ember';

export default Ember.Route.extend({
  model () {
    let contest = this.modelFor('contests.contest').contest;
    let editorial = null;
    let problem = this.modelFor('contests/contest/problem').problem;

    editorial = this.store.queryRecord ('editorial' , { p_id: problem.id, contest_id: contest.id })
      .catch (() => (void 0))

    return Ember.RSVP.hash({
      editorial: editorial,
      contest: contest,
      problem: problem
    });
  },

  actions: {
    editorialUnlocked () {
      this.refresh ()
    }
  }
});
