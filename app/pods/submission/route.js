import Ember from 'ember';

export default Ember.Route.extend({
  breadCrumb: {
    title: "Submission"
  },
  actions: {
    back: function () {
      window.history.back();
    }
  }
});
