import Ember from 'ember';

export default Ember.Route.extend({
  breadCrumb: {
    title: 'Problem'
  },
  model(params) {
    return Ember.RSVP.hash({
      p_id: params.problem_id,
      dailycb: this.get('store').queryRecord('dailycb', {custom: {ext: 'url', url: params.problem_id}})
    });
  },
  afterModel(model, transition) {
  const {dailycb} = model;
  this.set('breadCrumb.title',dailycb.get('problem.name'));
  }
});
