import Ember from 'ember';

export default Ember.Route.extend({
    model(params) {
	    let { contest } = this.modelFor('contests.contest');
	    let { problem_id } = this.modelFor('contests.contest.problem');
	    if(contest.isFinished) {
	        return this.store.queryRecord('editorial' , {p_id:problem_id});
	    }
    }
});
