/**
 * Created by umair on 12/01/17.
 */

import Ember from 'ember';

const { inject: { service }, isEmpty, RSVP } = Ember;

export default Ember.Service.extend({
  data: null,
  session: service('session'),
  store: service(),

  load () {
    if (this.get('session.isAuthenticated')) {
      let token = this.get('session.data.authenticated.access_token');
      return this.get('store').queryRecord('user', { me: true , token: token});
    }
  },

  // Returns a hash of authentication headers suitable for injection into $.ajax
  // requests, provided the user is logged in.
  getAuthHeaders () {
    if (this.get('session.isAuthenticated')) {
      const sessionData = this.get('session.data.authenticated');

      return {
        'oauth-id': sessionData.oauth_id,
        'access-token': sessionData.auth_token,
        'user-id': sessionData.user_id
      }
    }

    return { }
  }
});
