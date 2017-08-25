/*globals angular*/
/*eslint no-console: ["error", { allow: ["info", "error"] }]*/

// App Module
// ----------
const app = angular.module(`blockforge`,[
  `ngRoute`
]);

// Constants
// ---------
app.constant(`constants`, {
  VIEWER_PATH: `/viewer/1`
});

// Routes
// ------
app.config(($routeProvider) => {

  // Route Provider
  // --------------
  $routeProvider

  // Root
  // ----
  .when(`/`, {
    templateUrl: `controllers/root/root.template.html`,
    controller : `blockforgeRoot`
  })

  // Viewer
  // ------
  .when(`/viewer/:options`, {
    templateUrl: `controllers/viewer/viewer.template.html`,
    controller : `blockforgeViewer`
  })

  // Viewer
  // ------
  .when(`/camera/:options`, {
    templateUrl: `controllers/camera/camera.template.html`,
    controller : `blockforgeCamera`
  })

  // Fallback
  // --------
  .otherwise({
    redirectTo: `/`
  });

});

// On Load
// -------
app.run(() => {
  console.info(`%c Blockforge v1.0.0`, `color: #333; font-size: 1.3em;`);
});
