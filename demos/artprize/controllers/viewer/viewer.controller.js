/*globals location, app, io, Blockforge*/
/*eslint no-console: ["error", { allow: ["info", "error"] }]*/
app.controller(`blockforgeViewer`, [`$scope`, `constants`, function($scope){
  // Text
  // ----
  $scope.status      = `Waiting for data...`;
  $scope.robotStatus = `Waiting for data...`;
  $scope.viewers     = `Waiting for data...`;
  $scope.goodbye     = `Thank you for visiting!`;

  // Robots
  // ------
  $scope.robots = [];

  // Blocks
  // ------
  $scope.blocks = [];

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

  // Listen for viewers
  // ------------------
  blockforge.on(`viewers`, (count) => {
    $scope.viewers = `There ${count > 1? `are`: `is`} ${count} ${count > 1? `people`: `person`} here right now.`;
  });

  // Listen for detected blocks
  // --------------------------
  blockforge.on(`blocks`, (data) => {
    // Total blocks
    // ------------
    let totalBlocks = 0;

    // Clear previous values
    // ---------------------
    $scope.blocks = [];
    $scope.robots = [];

    // Compare two values to see if they are equal
    // -------------------------------------------
    const isEqual = (name, compare) => name === compare;

    // A place to store lines of blocks
    // --------------------------------
    const redSquareLines   = [];
    const blueSquareLines  = [];
    const greenSquareLines = [];

    // Find lines
    // ----------
    data.forEach((lines) => {
      totalBlocks += lines.length;

      lines.forEach((block, index) => {
        if((index === 0) && isEqual(`red-square-block`, block))  redSquareLines.push(lines);
        if((index === 0) && isEqual(`blue-square-block`, block)) blueSquareLines.push(lines);
        if((index === 0) && isEqual(`yellow-square-block`, block)) greenSquareLines.push(lines);
      });
    });

    // Update displayed blocks
    // -----------------------
    redSquareLines.forEach((line, index) => {
      $scope.blocks.push({
        position: `${index} 0.26 -3`,
        rotation: `0 0 0`,
        color   : `#FF3333`
      });
    });

    blueSquareLines.forEach((line, index) => {
      $scope.blocks.push({
        position: `${index} 0.26 -4`,
        rotation: `0 0 0`,
        color   : `#0033ff`
      });
    });

    greenSquareLines.forEach((line, index) => {
      $scope.blocks.push({
        position: `-${index + 1} 0.26 -3`,
        rotation: `0 0 0`,
        color   : `#ffaa33`
      });
    });

    // Updated displayed robots
    // ------------------------
    redSquareLines.forEach((line, index) => {
      const twirl = line[1] === `red-rectangle-block` ? true : false;
      $scope.robots.push({
        text    : (twirl ? `Weeee!` : ``),
        position: `-3.1 0 ${index - 1.5}`,
        twirl   : twirl,
        color   : `#FF3333`
      });
    });

    blueSquareLines.forEach((line, index) => {
      const twirl = line[1] === `blue-rectangle-block` ? true : false;
      $scope.robots.push({
        text    : twirl ? `Weeee!` : ``,
        position: `-4.1 0 ${index - 1.5}`,
        twirl   : twirl,
        color   : `#0033FF`
      });
    });

    greenSquareLines.forEach((line, index) => {
      const twirl = line[1] === `yellow-rectangle-block` ? true : false;
      $scope.robots.push({
        text    : (twirl ? `Weeee!` : ``),
        position: `-5.1 0 ${index - 1.5}`,
        twirl   : twirl,
        color   : `#FFAA33`
      });
    });

    // Update the status messages
    // --------------------------
    $scope.status      = `detected ${data.length} lines, ${totalBlocks} blocks`;
    $scope.robotStatus = `created ${data.length} robots`;

    // Update the scope
    // ----------------
    $scope.$apply();
  });
}]);