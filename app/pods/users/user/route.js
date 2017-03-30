import Ember from 'ember';

export default Ember.Route.extend({

    model(params) {
        return Ember.RSVP.hash({
            user: this.store.findRecord('user', params.user_id),
            submission: this.store.query('submission', { filter: { user_id: params.user_id, profile: true } })
        });
    },
    setupController(controller, model) {
        this._super(...arguments);
        Ember.set(controller, 'user', model.user);
        Ember.set(controller, 'submission', model.submission);
    }
});
