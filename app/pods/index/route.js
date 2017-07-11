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
  	// let blocksOfCode = null;
  	let contests = model.contests;
  	const blocksOfCode = model.contests.filter(contest => {
  		return contest.get('name').match('Blocks of Code')
  	}).pop();
  	// console.log(blocksOfCode);

    controller.set('blocksOfCode', blocksOfCode);
   }
});
