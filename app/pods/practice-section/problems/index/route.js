import Ember from 'ember';
import Env from '../../../../config/environment';

const { inject: { service }, Route } = Ember;

export default Ember.Route.extend({
  breadCrumb: {
    title: 'Problems'
  },
  model() {
    let {contest} = this.modelFor('practice-section.problems');
    return Ember.RSVP.hash({
      contest: contest,
    });
  },
  setupController: function (controller, model) {
    this._super(controller, model);
    let contest = model.contest;
    let contestId = contest.get('id');
  },
});
