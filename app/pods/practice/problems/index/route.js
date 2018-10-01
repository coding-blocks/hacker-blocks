import Ember from 'ember';

const { inject: { service } } = Ember;

export default Ember.Route.extend({
  breadCrumb:Ember.Object.create({
    title: 'Problems'
  }),
  model() {
    let {contest} = this.modelFor('practice.problems');
    return Ember.RSVP.hash({
      contest: contest,
    });
  },
afterModel(model, transition){
    const { contest } = model;
    this.set('breadCrumb.title',contest.get('name'));
},
  setupController: function (controller, model) {
    this._super(controller, model);
    let contest = model.contest;
    let contestId = contest.get('id');
  },
});
