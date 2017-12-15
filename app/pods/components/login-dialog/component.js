import Ember from 'ember';
const { inject: { service } } = Ember;

export default Ember.Component.extend({
  session: Ember.inject.service('session'),
   PN: service('pn'),
  didRender() {
    this._super(...arguments);
  },
  actions: {
    authenticate() {
      var self = this;
      let username = $('#username').val();
      let password = window.btoa($('#password').val());
      this.get('session').authenticate('authenticator:custom', username, password).catch((reason) => {
        Raven.captureException(reason);
        this.set('errorMessage', reason.error || reason);
      });
      this.get('session').on('authenticationSucceeded', function () {
        let user_id = self.get('session.data.authenticated.user_id');
        console.log('user id'+ user_id);
        self.get('PN').init(user_id);
        $('#loginModal').modal('hide');
      });
    }
  }
});
