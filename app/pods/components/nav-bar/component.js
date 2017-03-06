import Ember from 'ember';
import initNavAnim from '../../../utils/init-nav-anim';

export default Ember.Component.extend({
  didRender() {
    initNavAnim();
  }
});
