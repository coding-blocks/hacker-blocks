import Ember from 'ember';
import initNavAnim from '../../../utils/init-nav-anim';

export default Ember.Component.extend({
  didRender() {
       initNavAnim();
  },
  session: Ember.inject.service('session'),
  actions: {
    invalidateSession() {
      this.get('session').invalidate();
    }
  }
});
