import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL,
  notifyGoogleAnalytics: function() {
    if (config.environment === "production") {
      return ga('send', 'pageview', {
        'page': this.get('url'),
        'title': this.get('url')
      });
    }
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
      this.route('attempt', { path: '/attempt' });
      this.route('contest-result');
    });
    this.route('upcoming',{ path: '/upcoming/c/:contest_id' });
  });
  this.route('practice', function() {
    this.route('weekly-problem', {path: '/p/:problem_id'}, function () {
      this.route('main');
      this.route('submissions');
      this.route('leaderboard');
    });
  });
  this.route('users', function() {
   this.route('index', { path: '/all' });
   this.route('user',{path: '/:user_id'});
 });
  //this.route('application-loading-old-old');
  this.route('submission', {path: '/submission/:submission_id'});
  this.route('courses');
  this.route('application-error');
  this.route('practice-section', function() {
    this.route('problems',{ path: '/p/:contest_id' } ,function() {
      this.route('problem', {path: '/:problem_id'},function() {});
    });
  });
});

export default Router;
