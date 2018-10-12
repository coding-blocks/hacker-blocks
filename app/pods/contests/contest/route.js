import Ember from 'ember';
import DS from 'ember-data'
import Env from '../../../config/environment';

const { inject: { service }, Route } = Ember;

export default Ember.Route.extend({
  toast: Ember.inject.service (),
  model (params) {
    let contestId = params.contest_id;
    return Ember.RSVP.hash({
      contest: this.get('store').findRecord('contest', contestId, {reload: true})
    })
  },

  actions: {
    error (err, transition) {
      if (err instanceof DS.AdapterError) {
        transition.abort ()

        this.transitionTo (history.state.path)

        this
          .get ('toast')
          .error ('You do not have permission to access that contest!')
      } 
    }
  }
});
