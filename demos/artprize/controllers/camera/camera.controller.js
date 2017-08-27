/*globals app, tracking*/
/*eslint no-console: ["error", { allow: ["info", "error"] }]*/
app.controller(`blockforgeCamera`, [`$scope`, `constants`, function(){
  // Set sizing variables
  // --------------------
  const topMargin = 78;

  // Select elements
  // ---------------
  const video         = document.getElementById(`video`);
  const canvasElement = document.getElementById(`canvas`);

  // Get the canvas to draw on
  // -------------------------
  const canvas = canvasElement.getContext(`2d`);

  // Create color checks
  // -------------------
  const redColorCheck = (red, green, blue) => {
    if (red > 200 && green < 100 && blue < 100) {
      return true;
    }
    return false;
  };

  // Add color checks
  // ----------------
  tracking.ColorTracker.registerColor(`red`, redColorCheck);

  // Set colors to track
  // -------------------
  const colorOptions = [`red`, `magenta`, `cyan`, `yellow`];

  // Setup the block tracker
  // -----------------------
  const blockTracker = new tracking.ColorTracker(colorOptions);
  tracking.track(video, blockTracker, { camera: true });

  // Start tracking blocks
  // ---------------------
  blockTracker.on(`track`, (event) => {
    // Clear the canvas
    // ----------------
    canvas.clearRect(0, 0, canvasElement.width, canvasElement.height);

    // Add rectanges where blocks are detected
    // ---------------------------------------
    event.data.forEach((rectange) => {
      if (rectange.color === `custom`) {
        rectange.color = blockTracker.customColor;
      }
      canvas.strokeStyle = rectange.color;
      canvas.strokeRect(rectange.x, rectange.y, rectange.width, rectange.height);
      canvas.font = `11px Helvetica`;
      canvas.fillStyle = `#fff`;
      canvas.fillText(`x: ` + rectange.x + `px`, rectange.x + rectange.width + 5, rectange.y + 11);
      canvas.fillText(`y: ` + rectange.y + `px`, rectange.x + rectange.width + 5, rectange.y + 22);
    });
  });

  // Resize elements to fit current window size
  // ------------------------------------------
  const resizeElements = () => {
    const width  = document.body.clientWidth;
    const height = document.body.clientHeight;

    canvasElement.setAttribute(`height`, height - topMargin - 2);
    canvasElement.setAttribute(`width`, width);

    //video.setAttribute(`height`, height - topMargin);
    //video.setAttribute(`width`, width);
  };

  resizeElements();
  window.addEventListener(`resize`, resizeElements);
  console.info(`Camera Controller Ready...`);
}]);