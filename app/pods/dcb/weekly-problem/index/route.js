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
    let p_id = this.modelFor('dcb/weekly-problem').p_id;
    return Ember.RSVP.hash({
      lang_codes: lang_codes,
      dailycb: this.get('store').queryRecord('dailycb', {custom: {ext: 'url', url: p_id}}),
      p_id : p_id
    });
  }
});
