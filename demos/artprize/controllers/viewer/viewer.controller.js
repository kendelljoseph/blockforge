/*globals location, app, io, Blockforge*/
/*eslint no-console: ["error", { allow: ["info", "error"] }]*/
app.controller(`blockforgeViewer`, [`$scope`, `constants`, function($scope){
  // Boxes
  // -----
  $scope.boxes = [{
    position: `-1 0.5 -3`,
    rotation: `0 25 0`,
    color   : `#afe890`
  }];

  // Spheres
  // -------
  $scope.spheres = [{
    position: `0 1.25 -5`,
    radius  : `1.25`,
    color   : `#EF2D5E`
  }];

  // Cylinder
  // --------
  $scope.cylinders = [{
    position: `1 0.75 -3`,
    radius  : `0.5`,
    height  : `1.5`,
    color   : `#FFC65D`
  }];

  // Plane
  // -----
  $scope.planes = [{
    position: `0 0 -4`,
    rotation: `-90 0 0`,
    width   : `4`,
    height  : `4`,
    color   : `#7BC8A4`
  }];

  // Sky
  // ---
  $scope.sky = {
    color: `#eee`
  };

  // Blockforge Settings
  // -------------------
  const blockforgeSettings = {
    name  : `Art Prize`,
    socket: io.connect(`${location.origin}/receive`)
  };

  // Blockforge
  // ----------
  const blockforge = new Blockforge(blockforgeSettings);
  blockforge.on(`blocks`, (data) => {
    console.info(`recieved blocks`, data);
  });

  console.info(`Viewer Loaded...`, blockforge);
}]);