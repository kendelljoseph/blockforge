/*globals localStorage, angular*/
/*eslint quotes: [0] no-console: ["error", { allow: ["info", "error"] }]*/

// App Module
// ----------
var app = angular.module("blockforge",[
  "ngRoute"
]);

// Constants
// ---------
app.constant('constants', {
  // Titles
  // ------
  DASHBOARD_TITLE: 'Blockforge:Dashboard',
  HOME_TITLE     : 'Blockforge',

  // Paths and Routes
  // ----------------
  DASHBOARD_PATH: '/dashboard',
  HOME_PATH     : '/',

  // Request Types
  // -------------
  GET           : 'GET',
  POST          : 'POST',
  DELETE        : 'DELETE',
  PATCH         : 'PATCH',
  PUT           : 'PUT'
});

// Routes
// ------
app.config(function($routeProvider) {

  // Route Provider
  // --------------
  $routeProvider

  // Root
  // ----
  .when('/artprize/', {
    templateUrl: 'controllers/root/root.template.html',
    controller : 'blockforgeRoot'
  })

  // Dashboard
  // ---------
  .when('/dashboard/:project', {
    templateUrl: 'controllers/dashboard/dashboard.template.html',
    controller : 'blockforgeDashboard'
  })

  // Test
  // ----
  .when('/test', {
    templateUrl: 'controllers/test/test.template.html',
    controller : 'blockforgeTest'
  })
  
  // Fallback
  // --------
  .otherwise({
    redirectTo: '/'
  });

});

// On Load
// -------
app.run(function() {
  console.info("Blockforge loaded");
});
