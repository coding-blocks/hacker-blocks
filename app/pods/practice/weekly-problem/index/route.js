import Ember from 'ember';

var lang_codes = {
  "c": "C",
  "cpp": "C++",
  "py2": "Python",
  "java": "Java"
};

export default Ember.Route.extend({
  session: Ember.inject.service('session'),
  breadCrumb: {
    title: 'Description'
  },
  model() {
    let p_id = this.modelFor('practice/weekly-problem').p_id;
    return Ember.RSVP.hash({
      lang_codes: lang_codes,
      dailycb: this.get('store').findRecord('dailycb', p_id),
      lb: this.get('store').query('submission', {contest_id: 0, problem_id : p_id, leaderboard: true})
    });
  }
});
