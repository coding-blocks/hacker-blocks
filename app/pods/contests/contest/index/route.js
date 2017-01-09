import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    let contest = this.modelFor('contests.contest');
    return this.get('store').query('problem', {contest_id: contest.contest_id});
  }
});
