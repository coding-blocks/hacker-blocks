import Ember from 'ember';

export default Ember.Route.extend({
  model (params) {
    return {contest_id : params.contest_id};
  }
});
