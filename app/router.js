import Ember from 'ember';
import config from './config/environment';
import RouterScroll from 'ember-router-scroll';


const Router = Ember.Router.extend(RouterScroll ,{
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
        this.route('editorial');
      });
      this.route('attempt', { path: '/attempt' });
      this.route('contest-result');
      this.route('ended',{path: '/ended'});
      this.route ('leaderboard', { path: '/leaderboard' });
    });
    this.route('upcoming',{ path: '/upcoming/c/:contest_id' });
  });
  this.route('dcb', function() {
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
  this.route('submission', {path: '/submission/:submission_id'});
  this.route('courses');
  this.route('application-error');
  this.route('practice', function() {
    this.route('problems',{ path: '/p/:contest_id' } ,function() {
      this.route('problem', {path: '/:problem_id'},function() {});
    });
  });
  this.route('logout');
  this.route('info',{path: '/info/:id'});
  this.route('help');
  this.route('competitions', function() {
    this.route ('overview', { path: '/overview/:id' });
    this.route ('view', { path: '/:id' });
  });
});

export default Router;
