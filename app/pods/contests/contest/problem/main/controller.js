import Ember from 'ember';

export default Ember.Controller.extend({
  lang : {
    "c": {
      name: "C",
      mode: "ace/mode/c_cpp"
    },
    "cpp": {
      name: "C++",
      mode: "ace/mode/c_cpp"
    },
    "py2": {
      name: "Python",
      mode: "ace/mode/python"
    },
    "java": {
      name: "Java",
      mode: "ace/mode/java"
    }
  },
  actions: {
    langChange(langId) {
      $("#editor-lang").text(this.lang[langId]["name"]);
      ace.edit("editor").getSession().setMode(this.lang[langId]["mode"])
    }
  }
});
