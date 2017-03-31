import Ember from 'ember';
import config from '../../../config/environment';
import getSnippet from '../../../utils/get-snippet';

function startLoading() {
  $('.runner').addClass('disabled');
}

function stopLoading() {
  $('.runner').removeClass('disabled');
  $('.runner').button('reset');
}

function judge(component, problemId) {
  startLoading();
  let submission = {
    user_id: component.get('session.data.authenticated.user_id'),
    language: component.langId,
    problemId: problemId,
    source: window.btoa(ace.edit("editor").getValue()),
    custom_input: window.btoa($('#custom-input').val())
  };
  $.ajax({
    url: config.apiEndpoint + '/api/submissions',
    data: JSON.stringify(submission),
    type: "POST",
    contentType: "application/json",
    timeout: 50000
  }).done(function(data) {
    stopLoading();
    console.log("data returned = " + JSON.stringify(data));
    if (data.result == "compile_error") {
      component.set('output', window.atob(data.error));
    } else {
      if (problemId === undefined) {
        data.result = 'output';
        component.set('output', data.data.testcases[0].output);
      } else {
        component.set('output', data.data.testcases);
      }
    }
    component.set('result', data.result);
  }).fail(function(jqXHR, textStatus, errorThrown) {
    stopLoading();
  });
}

export default Ember.Component.extend({
  session: Ember.inject.service('session'),
  output: "",
  result: "",
  langId: "c",
  onceEdit: false,
  customInput: false,
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
    let editor = ace.edit("editor");
    let self = this;
    editor.textInput.getElement().onkeyup = function (event) {
      self.set("onceEdit", true);
    };
  },
  actions: {
    langChange() {
      let langId = $('#langSelect :selected').val();
      $("#editor-lang").text(this.lang_codes[langId]["name"]);
      let editor = ace.edit("editor");
      editor.getSession().setMode(this.lang_codes[langId]["mode"]);
      if (this.get("onceEdit") == false) {
        editor.setValue(getSnippet(langId));
      }
      this.langId = langId;
    },
    submit(problem) {
      $('#submit').button('loading');
      judge(this, problem.id);
    },
    run() {
      $('#run').button('loading');
      judge(this);
    },
    reset() {
      let langId = $('#langSelect :selected').val();
      let editor = ace.edit("editor");
      editor.setValue(getSnippet(langId));
      this.set("onceEdit", false);
    },
    customInput() {
      if (this.get('customInput') === true) {
        this.set('customInput', false);
      } else {
        this.set('customInput', true);
      }
    }
  }
});
