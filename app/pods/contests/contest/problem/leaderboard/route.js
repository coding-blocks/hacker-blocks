import Ember from 'ember';

export default Ember.Route.extend({
  ajax: Ember.inject.service(),
  model() {
    return this.get('store').query('submission', {problem_id : 1, leaderboard: true});
    // return this.get('ajax').request('http://localhost:3000/api/submisions?problem_id=' + 1);
  }
});
