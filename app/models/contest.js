/**
 * Created by umair on 30/12/16.
 */

import DS from 'ember-data';
import moment from 'npm:moment';

export default DS.Model.extend({
  name: DS.attr(),
  startTime: DS.attr(),
  endTime: DS.attr(),
  location: DS.attr(),
  showBanner: DS.attr(),
  image: DS.attr(),
  duration: DS.attr(),
  problems: DS.hasMany('problems'),
  description: DS.attr(),
  meta: DS.attr(),
  problemCount: Ember.computed ('meta.problem-count', function () {
    const metaProblemCount = this.get ('meta.problem-count')

    if (! metaProblemCount) {
      return this.get ('problems.length')
    }

    return metaProblemCount
  }),
  timeLeft: Ember.computed('endTime','duration', {
    get() {
      let duration = this.get('duration');
      let timeLeft = this.get('endTime') - moment().unix();
      return duration > timeLeft && timeLeft > 0 ? timeLeft: duration;
    }
  }),
  showLeaderboard: DS.attr(),
  showTags: DS.attr(),
  endTimeObj: Ember.computed('endTime', {
    get() {
      let obj = {};
      let unix = moment.unix(this.get('endTime'));
      obj.day = unix.format('DD');
      obj.month = moment.monthsShort()[unix.format('M') - 1].toUpperCase();
      obj.hour = unix.format('h');
      obj.min = unix.format('mm');
      let meri = unix.format('a');
      obj.meri1 = meri.substring(0, 1).toUpperCase();
      obj.meri2 = meri.substring(1).toUpperCase();
      return obj;
    }
  }),
  points: Ember.computed ('problemCount', function () {
    return this.get ('problemCount') * 100
  }),
  isFinished: Ember.computed('endTime', {
    get() {
      return moment().unix() > this.get('endTime');
    }
  })
});
