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

function judge(component, problemId, contestId, noScore, headers) {
  startLoading();
  let authHeaders = component.get('currentUser').getAuthHeaders();
  let submission = {
    user_id: component.get('session.data.authenticated.user_id'),
    language: component.langId,
    problemId: problemId,
    contestId: contestId,
    source: window.btoa(ace.edit("editor").getValue()),
    custom_input: window.btoa($('#custom-input').val()),
    no_score: noScore
  };
  $.ajax({
    url: config.apiEndpoint + '/api/submissions',
    data: JSON.stringify(submission),
    type: "POST",
    headers: authHeaders,
    contentType: "application/json",
    timeout: 100000
  }).done(function(data) {
    component.sendAction('refreshModel');
    stopLoading();
    if (data.result == "compile_error") {
      component.set('output', window.atob(data.error));
    } else {
      if (problemId === undefined) {
        data.result = 'output';
        component.set('output', data.data.output);
      } else {
        component.set('output', data.data.testcases);
      }
    }
    component.set('result', data.result);
  }).fail(function(jqXHR, textStatus, errorThrown) {
    component.set('result', 'error');
    stopLoading();
  });
}

export default Ember.Component.extend({
  session: Ember.inject.service('session'),
  currentUser: Ember.inject.service('current-user'),
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
  stub: Ember.computed('langId', 'problem.solutionStubs.[]', function () {
    let langId = this.get('langId')

    let stub;
    if (this.get('problem.solutionStubs') != undefined) {
      stub = this.get('problem.solutionStubs')
        .filter(
          (stub, index) => stub.get('language') === langId
        )
        .mapBy('body')
        .get('firstObject');
    }

    return (stub || getSnippet(langId))
  }),

  didRender() {
    let editor = ace.edit("editor");
    let self = this;

    editor.setValue(this.get('stub'));
    editor.textInput.getElement().onkeyup = function (event) {
      self.set("onceEdit", true);
    };
  },
  actions: {
    langChange() {
      let langId = $('#langSelect :selected').val();

      this.set('langId', langId)

      $("#editor-lang").text(this.lang_codes[langId]["name"]);
      let editor = ace.edit("editor");
      editor.getSession().setMode(this.lang_codes[langId]["mode"]);
      if (this.get("onceEdit") == false) {
        editor.setValue(this.get('stub'));
      }
      this.langId = langId;
    },
    submit(problem, noScore) {
      $('#submit').button('loading');
      judge(this, problem.id, this.get('contestId'), noScore);
    },
    run() {
      $('#run').button('loading');
      judge(this);
    },
    reset() {
      let langId = $('#langSelect :selected').val();
      let editor = ace.edit("editor");
      editor.setValue(this.get('stub'));
      this.set("onceEdit", false);
      $('#custom-input').val("");
      this.set('customInput', false);
      this.set("result", null);
      this.set("output", null);
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
