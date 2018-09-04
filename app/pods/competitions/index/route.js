import Ember from 'ember';

export default Ember.Route.extend({
  breadCrumb: {
    title: 'All Competitions'
  },

  model () {
    return this.get ('store').findAll ('competition')
  }
});
