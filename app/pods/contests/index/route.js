import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    console.log("contests/indes/route.js - model");
    console.log(params);
    return this.get('store').findAll('contest');
  }
});
