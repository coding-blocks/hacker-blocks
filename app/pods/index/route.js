import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    let day = moment(moment().unix(), 'X').format("YYYYMMDD");

    return Ember.RSVP.hash({
      dailyCBs: this.get('store').query('dailycb', {count: 4, day}),
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

    controller.set('blocksOfCode', blocksOfCode);
   }
});
