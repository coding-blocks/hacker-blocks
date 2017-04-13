import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return Ember.RSVP.hash({
      dailyCBs: this.get('store').query('dailycb', {count: 4}),
      contests: this.get('store').query('contest', { public: true })
    });
  }
});
