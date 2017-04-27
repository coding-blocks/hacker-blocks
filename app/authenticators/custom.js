/**
 * Created by umair on 03/01/17.
 */

import Ember from 'ember';
import Base from 'ember-simple-auth/authenticators/base';
import env from '../config/environment';

export default Base.extend({
  restore(data) {
    return new Ember.RSVP.Promise(function (resolve, reject) {
      resolve(data);
    });
  },
  authenticate() {
    var args = [...arguments];
    return new Ember.RSVP.Promise(function(resolve, reject) {
      /*
      let form = {};
      if (args[0].indexOf('@') > -1) {
        //user entered an email
        form.username = args[0];
      } else {
        form.roll_number = args[0];
      }
      form.password = args[1];*/
      $.get(env.apiEndpoint + '/oneauth/loggedIn?id=' + args[0], function (data) {
        if (data.authorized != undefined && data.authorized == true) {
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
