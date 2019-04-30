import Ember from 'ember';
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
    //setup an poll to call tick function with interval NO LESS than 1 sec
    const pollId = this.get('poll').addPoll({
      interval: 1000,
      callback: () => this.send('tick')
    })

    this.set('pollId', pollId)

    // compute the endTime
    if (!this.get('endTime')) {
      const startTime = this.get('startTime')
      const duration = this.get('duration')
      this.set('endTime', startTime+duration)
    }

    this.send('tick')

    return this._super(...arguments)
  },

  willDestroyElement () {
    this.get('poll').stopAll();
    return this._super(...arguments)
  },

  // The actual string to display in the coundown timer. 
  // The difference between now and endTime
  displayString: Ember.computed('endTime', 'now', function () {
    const now = this.get('now')
    const endTime = this.get('endTime')
    
    let diff = Math.floor(endTime - now)
    const hrs = Math.floor(diff/3600)
    diff %= 3600
    const min = Math.floor(diff/60)
    diff %= 60
    const sec = diff
    return `${hrs} Hours ${min} Mins and ${sec} Seconds`
  }),

  isCompleted: Ember.computed('endTime', 'now', function () {
    const now = this.get('now')
    const endTime = this.get('endTime')
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
