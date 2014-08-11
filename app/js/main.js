'use strict';

var angular = require('angular');

// angular modules
require('angular-ui-router');
require('./controllers/_index');
require('./services/_index');
require('./directives/_index');

// create and bootstrap application
angular.element(document).ready(function() {

  var requires = [
    'ui.router',
    'app.controllers',
    'app.services',
    'app.directives'
  ];

  angular.module('app', requires);

  angular.module('app').constant('Settings', require('./settings'));

  angular.module('app').config(require('./routes'));

  angular.module('app').run(require('./on_run'));

  angular.bootstrap(document, ['app']);

});