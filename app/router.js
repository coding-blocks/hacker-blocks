import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('contests', function() {
    this.route('contest', { path: '/contest/:contest_id' });
  });
  this.route('practice');
});

export default Router;
