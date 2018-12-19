import Ember from 'ember';

export default Ember.Route.extend({
  model (params) {
    const attachment = this.modelFor ('contests.contest.attachment')
    ;

    return attachment
  }
});
