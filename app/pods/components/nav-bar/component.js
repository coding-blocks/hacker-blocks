import Ember from 'ember';
import config from '../../../config/environment';

const { inject: { service } } = Ember;
export default Ember.Component.extend({
  navBarInitDone: false,
  PN: service('pn'),
  didRender() {
  },
  session: Ember.inject.service('session'),
  actions: {
    invalidateSession() {
        this.get('PN').unsubscribe([config.GLOBAL_CHAT_NAME]);
      this.get('PN').removeListener();
      this.get('session').invalidate();
    }
  }
});
