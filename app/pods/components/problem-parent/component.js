import Ember from 'ember';

export default Ember.Component.extend({
  tabInitDone: false,
  didRender() {
    this._super(...arguments);
    //We don't want to init tabs again and again else tabs will break
    if (this.get('tabInitDone') == false) {
      $('ul.tabs').tabs();
      this.set('tabInitDone', true);
    }
  }
});
