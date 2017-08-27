/*globals app */
/*eslint no-console: ["error", { allow: ["info", "error"] }]*/
app.controller(`blockforgeRoot`, [`$scope`, `$location`, `constants`, function($scope, $location, $constants){
  //const socket = io.connect();

  // Show the viewer
  // ---------------
  $scope.showViewer = () => $location.path($constants.VIEWER_PATH);

  // Show the camera
  // ---------------
  $scope.showCamera = () => $location.path($constants.CAMERA_PATH);

  console.info(`Root Loaded...`);
}]);