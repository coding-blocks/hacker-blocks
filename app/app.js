import Ember from 'ember';
import Resolver from './resolver';
import loadInitializers from 'ember-load-initializers';
import config from './config/environment';

let App;

Ember.MODEL_FACTORY_INJECTIONS = true;

App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver
});

Raven.config('https://7a2feba72f404d59b0e1d8537f1828b0@sentry.cb.lk/11').install();
loadInitializers(App, config.modulePrefix);

export default App;
