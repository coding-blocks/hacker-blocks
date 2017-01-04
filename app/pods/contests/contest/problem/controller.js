import Ember from 'ember';

export default Ember.Controller.extend({
  lang : {
    "c": "C",
    "cpp": "C++",
    "py2": "Python",
    "java": "Java"
  },
  actions: {
    langChange(langId) {
      $("#editor-lang").text(this.lang[langId]);
    }
  }
});
