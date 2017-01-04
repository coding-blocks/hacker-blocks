import Ember from 'ember';

export default Ember.Component.extend({
  session: Ember.inject.service('session'),
  didRender() {
    this._super(...arguments);
    $('.modal').modal();
  },
  actions: {
    authenticate() {
      let { identification, password } = this.getProperties('username', 'password');
      this.get('session').authenticate('authenticator:custom', identification, password).catch((reason) => {
        this.set('errorMessage', reason.error || reason);
      });
      this.get('session').on('authenticationSucceeded', function () {
        $('#login-dialog').modal('close');
      });
    }
  }
});
