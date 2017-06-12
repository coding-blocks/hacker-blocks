/**
 * Created by umair on 03/01/17.
 */

import Ember from 'ember';
import Base from 'ember-simple-auth/authenticators/base';
import env from '../config/environment';

export default Base.extend({
  restore(data) {
    return new Ember.RSVP.Promise(function (resolve, reject) {
      if (data.auth_token) {
        resolve(data);
      } else {
        console.log("Old logging system detected. Logging out.");
        reject();
      }
    });
  },
  authenticate() {
    var args = [...arguments];
    return new Ember.RSVP.Promise(function(resolve, reject) {
      $.get(env.apiEndpoint + '/oneauth/login?grant_code=' + args[0], function (data) {
        if (data.auth_token !== undefined) {
          resolve(data);
        } else {
          reject(data);
        }
      });
    });
  },
  invalidate(data) {
    return new Ember.RSVP.Promise(function(resolve, reject) {
      resolve();
    });
  }
});
