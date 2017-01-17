import Ember from 'ember';

export default Ember.Route.extend({
  breadCrumb: {
    title: 'omer'
  },
  model() {
    return this.get('store').findAll('contest');
  }
});
