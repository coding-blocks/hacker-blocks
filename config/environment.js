/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'hack',
    podModulePrefix: 'hack/pods',
    environment: environment,
    rootURL: '/',
    newRelic: {
	    licenseKey: 'c6b8d05c7f1b1c346ab611229292bbbf0820acd7',
	    spaMonitoring: true
    },
    locationType: 'router-scroll',
    historySupportMiddleware: true,
    publicUrl: 'http://hack.codingblocks.com',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
    ENV.apiEndpoint = 'http://localhost:3000'
    ENV.chatEndpoint = 'https://chat.cb.lk'
    ENV.mirageEnabled = process.env.HACK_FRONTEND_MIRAGE_ENABLED
    ENV.publicUrl = 'http://localhost:4200'
    ENV.GLOBAL_CHAT_NAME = 'chat-dev'
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    ENV.apiEndpoint = 'https://api.cb.lk';
    ENV.GLOBAL_CHAT_NAME = 'chat-prod';
    ENV.chatEndpoint = 'https://chat.cb.lk';
  }

  return ENV;
};
