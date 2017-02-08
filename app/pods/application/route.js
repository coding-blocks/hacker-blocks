import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

const { inject: { service }, Route } = Ember;

export default Ember.Route.extend(ApplicationRouteMixin, {
  routing: Ember.inject.service('-routing'),
  session:     service('session'),
  currentUserSer: service('current-user'),
  model() {

    console.log("router url = " + this.get('router.url'));
    var self = this;
    if (this.get('session.isAuthenticated')) {
      return this._loadCurrentUser().then((user) => {
        return user;
      });
    }
  },
  afterModel() {
    // console.log("Application afterModel");
    // this.set('controller.currentUrl', "umair");
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
