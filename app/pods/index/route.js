import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return Ember.RSVP.hash({
      daily: this.get('store').query('problem', {weekly: true, per_page: 4}),
      contests: this.get('store').findAll('contest')
    });
  }
});
