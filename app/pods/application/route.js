import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

const { inject: { service }, Route } = Ember;

export default Ember.Route.extend(ApplicationRouteMixin, {
  routing: Ember.inject.service('-routing'),
  session:     service('session'),
  currentUserSer: service('current-user'),
  url: Ember.observer('router.url', function () {
    this.set('controller.link', this.get('router.url'));
  }),
  model() {
    var self = this;
    if (this.get('session.isAuthenticated')) {
      return this._loadCurrentUser().then((user) => {
        return user;
      });
    }
  },
  sessionAuthenticated() {
    this._super(...arguments);
    // this._loadCurrentUser().catch(() => this.get('session').invalidate());
    this.refresh();
  },
  _loadCurrentUser() {
    return this.get('currentUserSer').load();
  }
});
