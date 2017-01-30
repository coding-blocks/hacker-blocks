import Ember from 'ember';
import config from '../../../config/environment';

function startLoading() {
  $('#code-submit-loader .preloader-wrapper').addClass('active');
  $('#code-submit').addClass('disabled');
}

function stopLoading() {
  $('#code-submit-loader .preloader-wrapper').removeClass('active');
  $('#code-submit').removeClass('disabled');
}

export default Ember.Component.extend({
  session: Ember.inject.service('session'),
  output: "",
  result: "",
  langId: "c",
  lang_codes: {
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
  didRender() {
    $('.dropdown-button').dropdown();
  },
  actions: {
    langChange(langId) {
      $("#editor-lang").text(this.lang_codes[langId]["name"]);
      ace.edit("editor").getSession().setMode(this.lang_codes[langId]["mode"]);
      this.langId = langId;
    },
    submit(problem) {
      startLoading();
      var self = this;
      var submission = this.get('store').createRecord('submission', {
        user_id: self.get('session.data.authenticated.user_id'),
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
        self.set('result', data.result);
        if (data.result == "compile_error") {
          self.set('output', window.atob(data.error));
        } else {
          self.set('output', data.data.testcases);
        }
      }).fail(function(jqXHR, textStatus, errorThrown) {
        stopLoading();
      });
      console.log("created submission object = " + JSON.stringify(submission));
    }
  }
});
