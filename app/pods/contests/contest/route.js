import Ember from 'ember';
import Env from '../../../config/environment';

const { inject: { service }, Route } = Ember;

export default Ember.Route.extend({
  model (params) {
    let contestId = params.contest_id;
    return Ember.RSVP.hash({
      contest: this.get('store').findRecord('contest', contestId)
    });
  }
});
