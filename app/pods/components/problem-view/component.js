import Ember from 'ember';

var tabInitDone = false;

export default Ember.Component.extend({
  didRender() {
    this._super(...arguments);
    if (!tabInitDone) {
      $('ul.tabs').tabs();
      tabInitDone = true;
    }
    $('.dropdown-button').dropdown();
  }
});
