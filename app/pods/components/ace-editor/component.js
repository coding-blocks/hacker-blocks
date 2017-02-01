import Ember from 'ember';
import getSnippet from '../../../utils/get-snippet';

export default Ember.Component.extend({
  didRender() {
    this._super(...arguments);
    let editor = ace.edit("editor");
    editor.setTheme("ace/theme/monokai");
    editor.getSession().setMode("ace/mode/c_cpp");
    editor.setValue(getSnippet('c'));
  }
});
