/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var Funnel = require('broccoli-funnel');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    // Add options here
  });

  app.import('vendor/css/all-themes.css');
  app.import('vendor/css/main.css');
  app.import('vendor/css/morris.css');
  app.import('vendor/css/bootstrap.min.css');
  app.import('vendor/css/login-popup.css');

  app.import('vendor/js/jquery.min.js');
  app.import('vendor/js/libscripts.bundle.js');
  app.import('vendor/js/mainscripts.bundle.js');
  app.import('vendor/js/vendorscripts.bundle.js');
  app.import('vendor/js/bootstrap.min.js');


  var extraAssets = new Funnel('bower_components/ace-builds/src-min-noconflict', {
    srcDir: '/',
    include: ['ace.js', 'ext-language_tools.js', 'snippets/c_cpp.js', 'snippets/java.js', 'snippets/python.js', 'worker-javascript.js', 'theme-monokai.js', 'mode-c_cpp.js', 'mode-java.js', 'mode-python.js'],
    destDir: '/assets/ace'
  });

  return app.toTree(extraAssets);
};
