import Ember from 'ember';

export default Ember.Route.extend({
  breadCrumb: {
    title: 'All Contests'
  },

  serverTime: Ember.inject.service (),

  model: function () {
    var activeContests = [];
    var upcomingContests = [];
    var previousContests = [];

    const contestTypes = this.get('store').query('contest', {custom: {ext: 'url', url: 'public'}}).then(function (contest) {
      var presentDate = this.get ('serverTime').getUnixTime ();
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

    return contestTypes.then( ()=> {
          return Ember.RSVP.hash({
            activeContests  : activeContests,
            upcomingContests: upcomingContests,
            previousContests: previousContests
          });
      });

  },

  setupController(controller, model) {
    this._super(...arguments);
    Ember.set(controller, 'activeContests', model.activeContests);
    Ember.set(controller, 'upcomingContests', model.upcomingContests);
    Ember.set(controller, 'previousContests', model.previousContests);
  }
});
