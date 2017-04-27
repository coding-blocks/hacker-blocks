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
     // $('#loginModal').modal('toggle');
      window.location = "https://account.codingblocks.com/oauth/authorize?" +
      "response_type=code" +
      "&client_id=3393643009" +
      "&redirect_uri=http://dc12e9d8.ngrok.io/oneauth";
    }
  }
});
