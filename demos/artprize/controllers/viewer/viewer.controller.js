/*globals location, app, io, Blockforge*/
/*eslint no-console: ["error", { allow: ["info", "error"] }]*/
app.controller(`blockforgeViewer`, [`$scope`, `constants`, function($scope){
  $scope.status = "Waiting for data...";

  // Boxes
  // -----
  $scope.boxes = [];

  // Spheres
  // -------
  $scope.spheres = [];

  // Cylinder
  // --------
  $scope.cylinders = [];

  // Plane
  // -----
  $scope.planes = [{
    position: `0 0 0`,
    rotation: `-90 0 0`,
    width   : `100`,
    height  : `100`,
    color   : `#222`
  }];

  // Sky
  // ---
  $scope.sky = {
    color: `#222`
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
    // Total blocks
    // ------------
    let totalBlocks = 0;

    // Clear previous values
    // ---------------------
    $scope.boxes     = [];
    $scope.cylinders = [];
    $scope.spheres   = [];

    // Compare two values to see if they are equal
    // -------------------------------------------
    const isEqual = (name, compare) => name === compare;

    // A place to store lines
    // ----------------------
    const redSquareLines    = [];
    const blueSquareLines   = [];
    const yellowSquareLines = [];

    // Find lines
    // ----------
    data.forEach((lines) => {
      totalBlocks += lines.length;

      lines.forEach((block, index) => {
        if((index === 0) && isEqual(`red-square-block`, block))  redSquareLines.push(lines);
        if((index === 0) && isEqual(`blue-square-block`, block)) blueSquareLines.push(lines);
        if((index === 0) && isEqual(`yellow-square-block`, block)) yellowSquareLines.push(lines);
      });
    });

    // Update VR blocks
    // ----------------
    redSquareLines.forEach((line, index) => {
      $scope.boxes.push({
        position: `${index} 0.5 -3`,
        rotation: `0 0 0`,
        color   : `#FF3333`
      });
    });

    blueSquareLines.forEach((line, index) => {
      $scope.boxes.push({
        position: `${index} 1.25 -3`,
        rotation: `0 0 0`,
        color   : `#0033ff`
      });
    });

    yellowSquareLines.forEach((line, index) => {
      $scope.boxes.push({
        position: `${index} 2.5 -3`,
        rotation: `0 0 0`,
        color   : `#ffaa33`
      });
    });

    // Update the status message
    $scope.status = `detected ${data.length} lines, ${totalBlocks} blocks`;

    // Update the scope
    // ----------------
    $scope.$apply();
  });
}]);