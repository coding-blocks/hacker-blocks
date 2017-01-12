/**
 * Created by umair on 03/01/17.
 */

import Ember from 'ember';
import Base from 'ember-simple-auth/authenticators/base';

export default Base.extend({
  restore(data) {
    console.log("authenticator restore data = " + JSON.stringify(data));
    return new Ember.RSVP.Promise(function (resolve, reject) {
      resolve(data);
    });
  },
  authenticate() {
    var args = [...arguments];
    console.log("authenticate args = " + JSON.stringify(args));
    return new Ember.RSVP.Promise(function(resolve, reject) {

      // $.post('http://104.199.170.235/login/login_user');
      // on success
      resolve({user_auth: "4ddb5616555a0b055057f260ce35e983"});
      // on failure
      // reject(reason);
    });
  },
  invalidate(data) {
    return new Ember.RSVP.Promise(function(resolve, reject) {
      resolve();
    });
  }
});
