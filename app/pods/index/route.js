import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return Ember.RSVP.hash({
      dailyCBs: this.get('store').query('dailycb', {count: 4}),
      contests: this.get('store').query('contest', {custom :  { ext : 'url',url : 'public'} }),
    });
  },

  setupController(controller, model) {
  	this._super(...arguments);
  	const blocksOfCode = model.contests.filter(contest => {
  	  if (contest.get('name').toLowerCase().match('blocks of code')) {
  	    if (!contest.get('isFinished')) {
  	      return true;
        }
      }
  	}).pop();
    let ans = false;
    ans = model.contests.filter(contest => {
	    if (!contest.get('isFinished')) {
		    return true;
	    }
    });
    controller.set('anyActiveContest',ans);
    controller.set('blocksOfCode', blocksOfCode);
   }
});
