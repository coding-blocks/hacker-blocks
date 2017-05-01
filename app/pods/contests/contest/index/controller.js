import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    redirectToContest() {
      this.get('target.router').refresh()
    }
  }
});
