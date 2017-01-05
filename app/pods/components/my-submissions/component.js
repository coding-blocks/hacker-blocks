import Ember from 'ember';

export default Ember.Component.extend({
  didRender() {
    this._super(...arguments);
    $(document).ready(function(){
      $('.collapsible').collapsible();
    });
  }
});
