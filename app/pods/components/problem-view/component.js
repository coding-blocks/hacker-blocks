import Ember from 'ember';

export default Ember.Component.extend({
  didRender() {
    this._super(...arguments);
    this.$('ul.tabs').tabs();
  }
});
