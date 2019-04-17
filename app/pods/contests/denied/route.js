import Ember from 'ember';

export default Ember.Route.extend({
  model (params) {
    return params
  },

  actions: {
    goBack (contest_id) {
      this.transitionTo ('contests.contest', contest_id)
    }
  }
});
