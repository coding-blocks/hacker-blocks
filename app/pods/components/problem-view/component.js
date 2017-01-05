import Ember from 'ember';

var tabInitDone = false;

export default Ember.Component.extend({
  didRender() {
    this._super(...arguments);
    //We don't want to init tabs again and again else tabs will break
    if (!tabInitDone) {
      $('ul.tabs').tabs();
      tabInitDone = true;
    }
    $('.dropdown-button').dropdown();
  }
});
