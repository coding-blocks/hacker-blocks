/**
 * Created by umair on 03/01/17.
 */

import Ember from 'ember';
import jwtDecode from 'ember-cli-jwt-decode';
import Base from 'ember-simple-auth/authenticators/base';
import { task, timeout } from 'ember-concurrency';
import env from '../config/environment';

export default Base.extend({
  refreshToken: null,
  jwt: null,
  restore(data) {
    return new Ember.RSVP.Promise( (resolve, reject) => {
      if (!Ember.isNone(data.jwt) && !Ember.isNone(data.refresh_token)) {

        // Make an immediate request
        //debugger;
        this.refreshToken = data.refresh_token
        this._scheduleRefreshTokenRequest(data.jwt)
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
          this._scheduleRefreshTokenRequest(data.jwt)
          resolve(data);
        } else {
          reject (new Error('GRANT_INVALID'))
        }
      }).fail( reject );
    });
  },
  _scheduleRefreshTokenRequest (rawJwt) {
    this.jwt = jwtDecode(rawJwt)
    let time = this.jwt.exp - (+new Date()/1000.0) - 50;
    time = time < 0 ? 0 : time
    console.log(time)
    Ember.run.later(this, this.refreshTokenRequest, time*1000)
  },
  refreshTokenRequestTask: task(function * (){
    timeout(5000)
    const sendRequestPromise = new Promise( (resolve, reject ) => {
        Ember.$.get(env.apiEndpoint + '/oneauth/rafrash?refresh_token=' + this.refreshToken , (data) => {
        if (!Ember.isNone(data.jwt)) {
          resolve(data)
        } else {
          reject()   
        }
      })
    })
    yield sendRequestPromise.then( data => {
      this._scheduleRefreshTokenRequest(data.jwt)
      this.trigger('sessionDataUpdated', {
        jwt: data.jwt,
        refresh_token: this.refreshToken,
        user_id: data.user_id,
        oauth_id: data.oauth_id
      })
    }).catch(err => {
      this.trigger('sessionDataInvalidated')
    })
    
  }).drop(), 
  refreshTokenRequest () {
    console.log("refreshTokenRequest", this.jwt.exp > (+new Date())/1000.0 + 50)
    if ( this.jwt.exp > (+new Date())/1000.0 + 50 && !Ember.isNone(this.jwt) && !Ember.isNone(this.refreshToken) ) {
        return ;
    }
    this.get('refreshTokenRequestTask').perform()
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
