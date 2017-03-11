import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL,
  notifyGoogleAnalytics: function() {
    return ga('send', 'pageview', {
      'page': this.get('url'),
      'title': this.get('url')
    });
  }.on('didTransition')
});

Router.map(function() {
  this.route('contests', function() {
    this.route('contest', { path: '/c/:contest_id' }, function() {
      this.route('problem', {path: '/:problem_id'}, function() {
        this.route('main');
        this.route('submissions');
        this.route('leaderboard');
      });
    });
  });
  this.route('practice', function() {
    this.route('weekly-problem', {path: '/p/:problem_id'}, function () {
      this.route('main');
      this.route('submissions');
      this.route('leaderboard');
    });
  });
  this.route('application-loading');
  this.route('submission', {path: '/submission/:submission_id'});
});

export default Router;
