import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service('session'),
  notifications: Ember.inject.service ('toast'),

  beforeModel (transition) {
    let session = this.get ('session'),
      notifications = this.get ('notifications')
    ;

    if (! session.get ('isAuthenticated')) {
      transition.abort ()
      notifications.error ('You must be logged in to view that!')
      this.transitionTo ('contests.index')
    }
  },

  model (params) {
    let store = this.get ('store')
    let { contest } = this.modelFor ('contests.contest');

    let attachment = store.findRecord ('attachment', params.attachment_id, { reload: true })
      .then (attachment => {
        attachment.set ('contest', contest)

        return attachment
      })

    return attachment
  }

});
