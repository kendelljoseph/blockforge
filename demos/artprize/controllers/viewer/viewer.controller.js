/*globals location, app, io, Blockforge*/
/*eslint no-console: ["error", { allow: ["info", "error"] }]*/
app.controller(`blockforgeViewer`, [`$scope`, `constants`, function($scope){
  // Text
  // ----
  $scope.status      = `Waiting for a camera...`;
  $scope.robotStatus = `Waiting for a camera...`;
  $scope.viewers     = `Waiting for data...`;
  $scope.goodbye     = `The development process.`;

  // Viewer count
  $scope.viewerCount = [];

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
    width   : `20`,
    height  : `20`,
    color   : `#fff`
  }, {
    position: `0 10 -10`,
    rotation: `0 0 0`,
    width   : `20`,
    height  : `20`,
    color   : `#fff`
  }, {
    position: `-10 10 0`,
    rotation: `0 90 0`,
    width   : `20`,
    height  : `20`,
    color   : `#fff`
  }, {
    position: `0 10 10`,
    rotation: `0 180 0`,
    width   : `20`,
    height  : `20`,
    color   : `#fff`
  }, {
    position: `10 10 0`,
    rotation: `0 -90 0`,
    width   : `20`,
    height  : `20`,
    color   : `#fff`
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
    if(count === $scope.viewerCount.length) return;
    /*
    $scope.viewerCount = [];
    const textOptions  = [`Hello!`, `Hi!`, `Beep!`, `Boop!`, `Hiya!`, `La la la`];

    for(let i=0; i < count; i++){
      let text = textOptions[Math.floor(Math.random() * textOptions.length)];
      $scope.viewerCount.push({
        text: `${text}`,
        position: `${(Math.random() * 3) + 3} -0.1.5 ${Math.random() > 0.5 ? `-`: ``}${Math.random() * 4}`,
        rotation: `0 ${Math.random() * 360} 0`
      });
    }
*/
    // Apply the changes the scope
    $scope.$apply();
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
        if((index === 0) && isEqual(`green-square-block`, block)) greenSquareLines.push(lines);
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
        color   : `#0033FF`
      });
    });

    greenSquareLines.forEach((line, index) => {
      $scope.blocks.push({
        position: `-${index + 1} 0.26 -3`,
        rotation: `0 0 0`,
        color   : `#11754b`
      });
    });

    // Store incoming robots here
    // --------------------------
    let incomingRobots = [];

    // Updated displayed robots
    // ------------------------
    redSquareLines.forEach((line, index) => {
      const twirl = line[1] === `red-rectangle-block` ? true : false;
      incomingRobots.push({
        text    : (twirl ? `Weeee!` : ``),
        position: `-3.1 0 ${index - 1.5}`,
        twirl   : twirl,
        color   : `#FF3333`
      });
    });

    blueSquareLines.forEach((line, index) => {
      const twirl = line[1] === `blue-rectangle-block` ? true : false;
      incomingRobots.push({
        text    : twirl ? `Weeee!` : ``,
        position: `-4.1 0 ${index - 1.5}`,
        twirl   : twirl,
        color   : `#0033FF`
      });
    });

    greenSquareLines.forEach((line, index) => {
      const twirl = line[1] === `green-rectangle-block` ? true : false;
      incomingRobots.push({
        text    : (twirl ? `Weeee!` : ``),
        position: `-5.1 0 ${index - 1.5}`,
        twirl   : twirl,
        color   : `#11754B`
      });
    });

    // Find any robots that changed
    // ----------------------------
    const changedRobotSet = $scope.robots.filter((robot) => {
      return incomingRobots.find((incomingRobot) => {
        let robot1 = Object.assign({}, robot);
        let robot2 = Object.assign({}, incomingRobot);
        delete robot1[`$$hashKey`];
        delete robot2[`$$hashKey`];

        return JSON.stringify(robot1) === JSON.stringify(robot2);
      });
    });

    // Update the robots if there are more than before
    // -----------------------------------------------
    if(changedRobotSet.length != $scope.robots.length) {
      $scope.robots = changedRobotSet;

    // Update the robots if any of the changed ones are new
    // ----------------------------------------------------
    } else {
      let hasNew = false;
      changedRobotSet.forEach((robot) => {
        if(hasNew) return;

        const newRobot = $scope.robots.find((newRobot) => {
          let robot1 = Object.assign({}, robot);
          let robot2 = Object.assign({}, newRobot);
          delete robot1[`$$hashKey`];
          delete robot2[`$$hashKey`];

          return JSON.stringify(robot1) != JSON.stringify(robot2);
        });

        if(newRobot){
          hasNew = true;
        }
      });

      if(hasNew) $scope.robots = changedRobotSet;
    }

    // Add incoming robots if they do not already exist
    // ------------------------------------------------
    incomingRobots.forEach((robot) => {
      const existingRobot = $scope.robots.find((existingRobot) => {
        let robot1 = Object.assign({}, robot);
        let robot2 = Object.assign({}, existingRobot);
        delete robot1[`$$hashKey`];
        delete robot2[`$$hashKey`];

        return JSON.stringify(robot1) === JSON.stringify(robot2);
      });

      if(!existingRobot) $scope.robots.push(robot);
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