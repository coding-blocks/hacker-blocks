/**
 * Created by umair on 03/01/17.
 */

import Ember from 'ember';
import Base from 'ember-simple-auth/authenticators/base';

export default Base.extend({
  restore(data) {
  },
  authenticate(options) {
    return new Ember.RSVP.Promise(function(resolve, reject) {
      // on success
      resolve();
      // on failure
      // reject(reason);
    });
  },
  invalidate(data) {
  }
});
