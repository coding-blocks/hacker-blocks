import Ember from 'ember';
import ENV from '../config/environment';
import moment from 'npm:moment';

import { task, timeout } from 'ember-concurrency';

export default Ember.Service.extend ({
  now: null,

  init () {
    this._super(...arguments)

    const unixTime = moment()
    this.set('now', unixTime)
    this.get('refreshCurrentTime').perform ()
    setInterval (() => {
      this.get('tick').perform ()
    }, 1000)

    setInterval (() => {
      this.get('refreshCurrentTime').perform ()
    }, 60000)
  },

  refreshCurrentTime: task (function * () {
    yield Ember.$.getJSON (ENV.apiEndpoint + '/time')
      .done ((data, status, xhr) => {
        const now = Math.floor(data.now / 1000)
        this.set('now', moment.unix(now))
      })
  }),

  tick: task (function * () {
    yield this.set('now', this.get('now').add(1, 'second'))
  }),

  getUnixTime () {
    return this.get('now').unix()
  },

  getTime () {
    return this.get('now')
  }
})
