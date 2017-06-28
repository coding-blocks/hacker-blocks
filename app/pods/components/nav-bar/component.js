import Ember from 'ember';
import config from '../../../config/environment';

const { inject: { service } } = Ember;
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
