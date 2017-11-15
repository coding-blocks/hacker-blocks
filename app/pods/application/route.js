import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

const { inject: { service }, Route } = Ember;

export default Ember.Route.extend(ApplicationRouteMixin, {
  routing: Ember.inject.service('-routing'),
  // chat: service('chat'),
  session: service('session'),
  currentUserSer: service('current-user'),
  url: Ember.observer('router.url', function () {
    this.set('controller.link', this.get('router.url'));
  }),
  model() {
    if (this.get('session.isAuthenticated')) {
      return this._loadCurrentUser();
    }
  },
  beforeModel(transition) {
    if (!this.get('session.isAuthenticated') && transition.queryParams.code !== undefined) {
      this.get('session').authenticate('authenticator:custom', transition.queryParams.code).then(()=>{
        var retrievedPath = localStorage.getItem('redirection-path');
        localStorage.removeItem('redirection-path');
        window.location.href = retrievedPath;
      }).catch((reason) => {
          Raven.captureException(reason);
        // console.log("not logged in", reason);
      });
    }
  },
  /*
  setupController: function(controller, model){
    this._super(controller, model);
    Ember.run.schedule('afterRender', this, function () {

    });
  },*/
  sessionAuthenticated() {
    this._super(...arguments);
    // this._loadCurrentUser().catch(() => this.get('session').invalidate());
    this.refresh();
  },
  _loadCurrentUser() {
    return this.get('currentUserSer').load();
  },
  afterModel() {
    /*
    if (this.get('session.isAuthenticated')) {
      let user_id = this.get('session.data.authenticated.user_id');
      this.get('chat').init(user_id, config.GLOBAL_CHAT_NAME);
    }*/
  }
});
