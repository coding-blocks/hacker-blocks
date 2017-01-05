import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('contests', function() {
    this.route('contest', { path: '/contest/:contest_id' }, function() {
      this.route('problem', {path: '/:problem_id'}, function() {
        this.route('main');
        this.route('submissions');
        this.route('leaderboard');
      });
    });
  });
  this.route('practice');
});

export default Router;
