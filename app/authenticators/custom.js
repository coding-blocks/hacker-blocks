/**
 * Created by umair on 03/01/17.
 */

import Ember from 'ember';
import Base from 'ember-simple-auth/authenticators/base';
import env from '../config/environment';

export default Base.extend({
  refreshToken: null,
  restore(data) {
    return new Ember.RSVP.Promise( (resolve, reject) => {
      if (!Ember.isNone(data.jwt) && !Ember.isNone(data.refresh_token)) {

        // Make an immediate request
        //debugger;
        this.refreshToken = data.refresh_token
        Ember.run.later(this, this.refreshTokenRequest, data.refresh_token, 0)
        resolve(data);
      } else {
        console.log("Old logging system detected. Logging out.");
        reject();
      }
    });
  },
  authenticate() {
    var args = [...arguments];
    return new Ember.RSVP.Promise((resolve, reject) => {
      Ember.$.get(env.apiEndpoint + '/oneauth/login?grant_code=' + args[0], data => {
        if (!Ember.isNone(data.jwt) && !Ember.isNone(data.refresh_token)) {

          //Schedule a refreshToken request
          this.refreshToken = data.refresh_token
          resolve(data);
        } else {
          reject(data);
        }
      });
    });
  },
  refreshTokenRequest () {
    Ember.$.get(env.apiEndpoint + '/oneauth/refrash?refresh_token=' + this.refreshToken , (data) => {
      if (!Ember.isNone(data.jwt)) {
        this.trigger('sessionDataUpdated', {
          jwt: data.jwt,
          refresh_token: this.refreshToken,
          user_id: data.user_id,
          oauth_id: data.oauth_id
        })
      } else {
        this.trigger('sessionDataInvalidated')
      }
    })
  },
  invalidate(data) {
    return new Ember.RSVP.Promise((resolve, reject) => {
      // keep on the event loop
      Ember.$.get(env.apiEndpoint+ '/oneauth/logout?refresh_token='+ this.refreshToken, data => {
        window.location.href = "https://account.codingblocks.com/logout?redirect=" + env.publicUrl;
        resolve();
      })
    });
  }
});
