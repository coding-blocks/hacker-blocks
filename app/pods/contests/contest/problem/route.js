
import Ember from 'ember';

const { inject: { service } } = Ember;

var lang_codes = {
  "c": "C",
  "cpp": "C++",
  "py2": "Python",
  "java": "Java"
};

export default Ember.Route.extend({
  session: Ember.inject.service('session'),
  currentAttemptService: service('current-attempt'),
  breadCrumb: Ember.Object.create({
    title: 'Problem'
  }),
  model(params) {
    let contest = this.modelFor('contests.contest').contest;
    let store = this.get ('store')
    let editorial = null;
    let problem_id = params.problem_id;
    let problem = null;
    let problems = contest.get('problems');

    // TODO: Block if this fails
    let problemAttempt = store.createRecord ('problemAttempt', {
      contestId: contest.id,
      problemId: problem_id
    }).save ()

    problems.forEach((p) => {
	    if(problem_id == p.id) {
		    problem = this.get('store').queryRecord('problem', {problem_id, contest_id: contest.id});
	    }
    });

    return Ember.RSVP.hash({
      editorial:editorial,
      lang_codes: lang_codes,
      problem: problem,
      contest: contest,
      problem_id: params.problem_id,
      currentAttempt: this.get('currentAttemptService').getCurrentAttempts(contest.id)
    });
  },
  afterModel(model, transition) {
    const { currentAttempt, contest,problem } = model;
    this.set('breadCrumb.title',problem.get('name'));

    if ( Ember.isNone(contest.get('duration')) ) {
      return
    }

    if ( Ember.isNone(currentAttempt.data) ) {
      this.transitionTo('contests.contest.attempt', model.contest.id)
    }
  },
  setupController (controller, model) {
    controller.set('contest', model.contest)
    controller.set('currentAttempt', model.currentAttempt)
    this._super(...arguments)
  }
});
