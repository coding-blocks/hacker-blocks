import Ember from 'ember';

export default Ember.Route.extend({
  store: Ember.inject.service(),
  breadCrumb: {
    title: 'Problem'
  },
  model(params) {
    const problemAttempt = this.get('store').createRecord ('problemAttempt', {
      contestId: 0,
      problemId: params.problem_id
    }).save ()
    return Ember.RSVP.hash({
      problemAttempt,
      p_id: params.problem_id,
      dailycb: this.get('store').queryRecord('dailycb', {custom: {ext: 'url', url: params.problem_id}})
    });
  },
  afterModel(model, transition) {
    const {dailycb} = model;
    this.set('breadCrumb.title',dailycb.get('problem.name'));
  }
});
