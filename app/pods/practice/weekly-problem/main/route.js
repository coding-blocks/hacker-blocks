import Ember from 'ember';

var lang_codes = {
  "c": "C",
  "cpp": "C++",
  "py2": "Python",
  "java": "Java"
};

export default Ember.Route.extend({
  breadCrumb: {
    title: 'Description'
  },
  model() {
    var problem_id = this.modelFor('practice/weekly-problem').problem_id;
    return Ember.RSVP.hash({
      lang_codes: lang_codes,
      problem: this.get('store').findRecord('problem', problem_id, {
        adapterOptions: { query: {
          weekly: true
        }}
      })
    });
  }
});
