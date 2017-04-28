import Ember from 'ember';
const { inject: { service } } = Ember;
export default Ember.Component.extend({
  navBarInitDone: false,
  PN: service('pn'),
  didRender() {
  },
  session: Ember.inject.service('session'),
  actions: {
    invalidateSession() {
        this.get('PN').unsubscribe(['global-chat-prac']);
      this.get('PN').removeListener();
      this.get('session').invalidate();
    }
  }
});
