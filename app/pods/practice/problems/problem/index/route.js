import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service('session'),
  breadCrumb: Ember.Object.create({
    title: 'Problem'
  }),
  model() {
    let contest = this.modelFor('practice.problems').contest;
    let problem_id = this.modelFor('practice.problems.problem').problem_id;
    return Ember.RSVP.hash({
      problem: this.get('store').queryRecord('problem', {problem_id, contest_id: contest.id}),
      contest: contest
    });
  },
  afterModel(model,transtion) {  
    const { problem } = model;
    this.set('breadCrumb.title',problem.get('name'));
  }
});
