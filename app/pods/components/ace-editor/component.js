import Ember from 'ember';

export default Ember.Component.extend({
  didRender() {
    this._super(...arguments);
    var editor = ace.edit("editor");
    editor.setTheme("ace/theme/monokai");
    editor.getSession().setMode("ace/mode/javascript");
    console.log("Editor init done with");
  }
});
