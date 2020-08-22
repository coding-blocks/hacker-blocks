import Ember, { TransformEachInToHash } from 'ember';
import moment from 'npm:moment';

/*
  @params
  startTime: Unix Timestamp(in seconds) When the user clicks attempt
  duration: Unix Timestamp(in seconds) the duration for the contest
  onComplete: an Action/method to call when the countdown ends
*/

export default Ember.Component.extend({
  //pollId: Id of the current tick poll
  //endTime: Unix Timestamp(in seconds) of the endTime (startTime+duration)

  poll: Ember.inject.service(),
  serverTime: Ember.inject.service (),
  
  didReceiveAttrs () {
    // convert start time to moment
    this.set('startTime', moment(this.get('startTime')))

    //setup an poll to call tick function with interval NO LESS than 1 sec
    const pollId = this.get('poll').addPoll({
      interval: 1000,
      callback: () => this.send('tick')
    })

    this.set('pollId', pollId)

    const startTime = this.get('startTime')
    const duration = this.get('duration')
    this.set('endTime', startTime.add(duration, 'second'))

    this.send('tick')

    return this._super(...arguments)
  },

  willDestroyElement () {
    this.get('poll').stopAll();
    return this._super(...arguments)
  },


  countdownEndTime: Ember.computed('duration', 'startTime', function() {
    return this.get('startTime').add(this.get('duration'), 'second')
  }),

  // The actual string to display in the coundown timer. 
  // The difference between now and endTime
  displayString: Ember.computed('now', function () {
    const now = moment.unix(this.get('now'))
    const endTime = this.get('countdownEndTime')
    
    const diff = moment.unix(endTime.diff(now, 'seconds '))
    const hrs = diff.hours()
    const min = diff.minutes()
    const sec = diff.seconds()
    return `${hrs} Hours ${min} Mins and ${sec} Seconds`
  }),

  isCompleted: Ember.computed('now', function () {
    const now = moment.unix(this.get('now'))
    const endTime = this.get('countdownEndTime')
    if (now >= endTime) {
      this.get('poll').stopAll();
      Ember.run.scheduleOnce('render', () => {
        this.get('onComplete')()
      })
      return true;
    } else {
      return false
    }
  }),

  actions: {
    tick() {
      // set now equal to unix timestamp in seconds
      this.set ('now', this.get ('serverTime').getUnixTime ()) ;
    },
  }
});
