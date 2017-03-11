import Ember from 'ember';
import initNavAnim from '../../../utils/init-nav-anim';

export default Ember.Component.extend({
  navBarInitDone: false,
  didRender() {
      if (this.get('navBarInitDone') === false) {
        initNavAnim();
        this.set('navBarInitDone', true);
      }
  },
  session: Ember.inject.service('session'),
  actions: {
    invalidateSession() {
      this.get('session').invalidate();
    }
  }
});
