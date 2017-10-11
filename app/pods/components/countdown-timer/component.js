import Ember from 'ember';

export default Ember.Component.extend({
  // UNIX Timestamps, in seconds
  startTime: null,
  duration: null,
  now: null,

  endTime: Ember.computed('startTime', 'duration', function () {
    return this.get('startTime') + this.get('duration');
  }),

  // The actual string to display in the coundown timer. You can override this
  // in child timers to achieve different kinds of effects.
  displayString: Ember.computed('now', function () {
    let now = this.get('now'),
      endTime = this.get('endTime'),
      secondsLeft = Math.floor(endTime - (now / 1000)),
      displaySeconds = secondsLeft % 60,
      displayMinutes = Math.floor(secondsLeft / 60) % 60,
      displayHours = Math.floor(secondsLeft / 3600);
    
    return `${displayHours}h, ${displayMinutes}m, and ${displaySeconds}s`;
  }),

  // The update logic. You can update this in child timers to achieve different
  // steps (say, increment the clock by five each second, etc).
  tick() {
    this.set('now', (new Date().getTime()));
  },

  init(timestamp) {
    this._super(...arguments);

    this.tick()
  },

  didRender() {
    let now = this.get('now'),
      endTime = this.get('endTime');

    if ((now / 1000) > endTime) {
      this.get('onComplete')();
    } else {
      Ember.run.later(
        this.get('tick').bind(this),
        1000
      );
    }
  }
});
