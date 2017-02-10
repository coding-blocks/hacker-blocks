import Ember from 'ember';
import config from '../../../config/environment';
import getSnippet from '../../../utils/get-snippet';

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
      let editor = ace.edit("editor");
      editor.getSession().setMode(this.lang_codes[langId]["mode"]);
      editor.setValue(getSnippet(langId));
      this.langId = langId;
    },
    submit(problem) {
      if (this.get('session.isAuthenticated') != true) {
        Materialize.toast('You must login before submitting a solution.', 3000, 'rounded');
        return;
      }
      startLoading();
      var self = this;
      var submission = this.get('store').createRecord('submission', {
        user_id: self.get('session.data.authenticated.user_id'),
        language: self.langId,
        problemId: problem.id,
        source: window.btoa(ace.edit("editor").getValue())
      });
      $.ajax({
        url: config.apiEndpoint + '/api/submissions',
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
