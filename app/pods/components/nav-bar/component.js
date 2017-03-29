import Ember from 'ember';

export default Ember.Component.extend({
  navBarInitDone: false,
  didRender() {
  },
  session: Ember.inject.service('session'),
  actions: {
    invalidateSession() {
      this.get('session').invalidate();
    }
  }
});
