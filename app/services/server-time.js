import Ember from 'ember';
import ENV from '../config/environment';
import { task, timeout } from 'ember-concurrency';

export default Ember.Service.extend ({
  now: null,

  init () {
    this._super (...arguments)

    this.set ('now', Math.floor (Date.now () / 1000))

    this.get ('refreshCurrentTime').perform ()

    setInterval (() => {
      this.get ('tick').perform () }
      , 1000)
    setInterval (() => {
      this.get ('refreshCurrentTime').perform ()
    }, 60000)
  },

  refreshCurrentTime: task (function * () {
    yield Ember.$.getJSON (ENV.apiEndpoint + '/time')
      .done ((data, status, xhr) => {
        this.set ('now', data.now)
      })
  }),

  tick: task (function * () {
    yield this.set ('now', this.get ('now') + 1000)
  }),

  getUnixTime () {
    return Math.floor (this.get ('now') / 1000)
  }
})
