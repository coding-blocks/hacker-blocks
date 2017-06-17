import Ember from 'ember';

export default Ember.Route.extend({
  breadCrumb: {
    title: 'Practice Section'
  },

  model: function () {
    var practiceContests = [];

    const practiceTypes = this.get('store').findAll('practice_category').then(function (practice) {
      practice.forEach(function (element) {
          practiceContests.pushObject(element);
      });
    });
    return practiceTypes.then( ()=>{
            return Ember.RSVP.hash({
              practiceContests: practiceContests
            });
        });
  },

  setupController(controller, model) {
    this._super(...arguments);
    Ember.set(controller, 'practiceContests', model.practiceContests);
  }
});
