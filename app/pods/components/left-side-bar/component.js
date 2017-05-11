import Ember from 'ember';
import config from '../../../config/environment';

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
     var redirectionPath = window.location.pathname;
     redirectionPath = redirectionPath.replace(/^\/|\/$/g, '');
     localStorage.setItem('redirection-path', redirectionPath);
      window.location = "https://account.codingblocks.com/oauth/authorize?" +
      "response_type=code" +
      "&client_id=2146237097" +
      "&redirect_uri=" + config.publicUrl
    }
  }
});
