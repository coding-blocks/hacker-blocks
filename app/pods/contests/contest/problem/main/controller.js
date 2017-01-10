import Ember from 'ember';

import config from '../../../../../config/environment';

function startLoading() {
  $('#code-submit-loader .preloader-wrapper').addClass('active');
  $('#code-submit').addClass('disabled');
}

function stopLoading() {
  $('#code-submit-loader .preloader-wrapper').removeClass('active');
  $('#code-submit').removeClass('disabled');
}

export default Ember.Controller.extend({
  init: function () {
    this._super();
  },
  langId: "c",
  lang: {
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
      ace.edit("editor").getSession().setMode(this.lang[langId]["mode"]);
      this.langId = langId;
    },
    submit(problem) {
      startLoading();
      var self = this;
      var submission = this.get('store').createRecord('submission', {
        user: 1,
        language: self.langId,
        problemId: problem.id,
        source: window.btoa(ace.edit("editor").getValue())
      });
      $.ajax({
        url: config.hostUrl + '/api/submissions',
        data: JSON.stringify(submission),
        type: "POST",
        contentType: "application/json",
        timeout: 10000
      }).done(function(data){
          stopLoading();
          console.log("data returned = " + JSON.stringify(data));
      }).fail(function(jqXHR, textStatus, errorThrown) {
        stopLoading();
      });
      console.log("created submission object = " + JSON.stringify(submission));
    }
  }
});
