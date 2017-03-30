import Ember from 'ember';

export default Ember.Route.extend({
  breadCrumb: {
    title: 'All Contests'
  },

  model: function () {
    var activeContests = [];
    var upcomingContests = [];
    var previousContests = [];

    this.get('store').findAll('contest').then(function (contest) {
      var presentDate = Math.floor(new Date().valueOf() / 1000);
      contest.forEach(function (element) {
        if (element.get('startTime') <= presentDate && element.get('endTime') >= presentDate) {
          activeContests.pushObject(element);
        } else if (element.get('startTime') > presentDate) {
          upcomingContests.pushObject(element);
        } else {
          previousContests.pushObject(element);
        }
      })
    });

    return Ember.RSVP.hash({
      activeContests: activeContests,
      upcomingContests: upcomingContests,
      previousContests: previousContests
    });
  },

  setupController(controller, model) {
    this._super(...arguments);
    Ember.set(controller, 'activeContests', model.activeContests);
    Ember.set(controller, 'upcomingContests', model.upcomingContests);
    Ember.set(controller, 'previousContests', model.previousContests);
  }
});
