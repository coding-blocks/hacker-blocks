import Ember from 'ember';

export default Ember.Controller.extend({
  init: function () {
    this._super();
    Ember.run.schedule("afterRender",this,function() {
      console.log("After render called");
      $('.dropdown-button').dropdown();
    });
  },
});
