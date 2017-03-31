import Ember from 'ember';

export default Ember.Component.extend({
  didRenderDone: false,
  didRender() {
    if (this.get('didRenderDone') === false) {
      $.AdminBSB.leftSideBar.activate();
      $.AdminBSB.navbar.activate();
      this.set('didRenderDone', true);
    }
  },
  session: Ember.inject.service('session'),
  actions: {
    popup() {
     $('#loginModal').modal('toggle');
    }
  }
});
