/**
 * Created by umair on 12/01/17.
 */

const { inject: { service }, isEmpty, RSVP } = Ember;

export default Ember.Service.extend({
  data: null,
  session: service('session'),
  store: service(),

  load() {
    var self = this;
    if (this.get('session.isAuthenticated')) {
      let token = this.get('session.data.authenticated.user_auth');
      return this.get('store').queryRecord('user', { me: true , token: token}).then((user) => {
        self.set('data', user);
        return user;
      });
    }
  }
});
