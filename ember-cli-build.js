/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var Funnel = require('broccoli-funnel');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    // Add options here
  });

  app.import('vendor/css/bootstrap.min.css');
  app.import('vendor/css/bootstrap-theme.min.css');
  app.import('vendor/css/font-awesome.css');
  app.import('vendor/css/style.css');
  app.import('vendor/css/autoptimize.css');

  app.import('vendor/js/jquery.min.js');
  app.import('vendor/js/bootstrap.min.js');
  app.import('vendor/js/autoptimize.js');
  app.import('vendor/materialize.min.js');

  var extraAssets = new Funnel('bower_components/ace-builds/src-min-noconflict', {
    srcDir: '/',
    include: ['ace.js', 'worker-javascript.js', 'theme-monokai.js', 'mode-c_cpp.js', 'mode-java.js', 'mode-python.js'],
    destDir: '/assets/ace'
  });

  return app.toTree(extraAssets);
};
