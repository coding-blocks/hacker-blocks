import Ember from 'ember';

export default Ember.Route.extend({
  breadCrumb: {
    title: "Practice"
  },
  model() {
    return Ember.RSVP.hash({
      problems: this.get('store').query('problem', {weekly: true}),
      today: new Date().getDay()
    });
  }
});
