import Ember from 'ember';

export default Ember.Component.extend({
  didRender() {
    this._super(...arguments);
    $('ul.tabs').tabs();
    $('.dropdown-button').dropdown();
  }
});
