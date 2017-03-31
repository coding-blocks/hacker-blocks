import Ember from 'ember';

export default Ember.Component.extend({
  session: Ember.inject.service('session'),
  didRender() {
    this._super(...arguments);
  },
  actions: {
    authenticate() {
      let username = $('#username').val();
      let password = window.btoa($('#password').val());
      this.get('session').authenticate('authenticator:custom', username, password).catch((reason) => {
        this.set('errorMessage', reason.error || reason);
      });
      this.get('session').on('authenticationSucceeded', function () {
        $('#loginModal').modal('toggle');
      });
    }
  }
});
