import Ember from 'ember';

export default Ember.Component.extend({
  routing: Ember.inject.service('-routing'),
  link: Ember.computed('routing.currentRouteName', {
    get() {
      const routeName = this.get('routing.currentRouteName');
      const route = Ember.getOwner(this).lookup(`route:${routeName}`);
      console.log("route name = " + routeName);
      const url = Ember.getWithDefault(route, 'url', window.href);
      console.log("url = " + url);
      return url;
    }
  }).readOnly()
});
