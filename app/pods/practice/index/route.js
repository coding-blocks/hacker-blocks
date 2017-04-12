import Ember from 'ember';

export default Ember.Route.extend({
  breadCrumb: {
    title: "Daily CodeBytes"
  },
  model() {
    let mainProblem = [];
    let otherProblems = [];

    this.get('store').query('dailycb', {count: 7}).then(function (problem) {
      problem.forEach(function (element, index) {
        if (index == 0) {
          mainProblem.pushObject(element);
        } else {
          otherProblems.pushObject(element);
        }
      });
    });

    return Ember.RSVP.hash({
        mainProblem: mainProblem,
        otherProblems: otherProblems
    });
  },

  setupController(controller, model) {
      this._super(...arguments);
      Ember.set(controller, 'mainProblem', model.mainProblem);
      Ember.set(controller, 'otherProblems', model.otherProblems);
  }
});
