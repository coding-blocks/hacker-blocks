import Ember from 'ember';

export default Ember.Component.extend({
  session: Ember.inject.service('session'),
  actions: {
    popup() {
     $('#loginModal').modal('toggle');
    }
  }
});