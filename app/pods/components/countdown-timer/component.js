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
      endTime = this.get('endTime');

    return `${Math.floor(endTime - (now / 1000))}`;
  }),

  // The update logic. You can update this in child timers to achieve different
  // steps (say, increment the clock by five each second, etc).
  tick () {
    let now = this.get('now'),
      endTime = this.get('endTime');

    this.set('now', (new Date().getTime()));
  },

  init (timestamp) {
    this._super(...arguments);

    let startTime = this.get('startTime'),
        duration = this.get('duration');

    this.tick()
  },

  didRender () {
    let now = this.get('now'),
      endTime = this.get('endTime');

    if ((now / 1000) > endTime) {
      this.get('onComplete')();
    }

    Ember.run.later(
      this.get('tick').bind(this),
      1000
    )
  }
});
