/*globals app, location, io, tracking, Blockforge*/
/*eslint no-console: ["error", { allow: ["info", "error"] }]*/
app.controller(`blockforgeCamera`, [`$scope`, `constants`, function(){
  // Select elements
  // ---------------
  const video         = document.getElementById(`video`);
  const canvasElement = document.getElementById(`canvas`);

  // Blockforge Settings
  // -------------------
  const blockforgeSettings = {
    name  : `Art Prize`,
    socket: io.connect(`${location.origin}/send`),
    video : video,
    canvas: canvasElement,
    line  : {
      tolerance: 30
    }
  };

  // Blockforge
  // ----------
  const blockforge = new Blockforge(blockforgeSettings);

  // Register a red square block
  // ---------------------------
  blockforge.register(`red-square-block`, {
    name: `Square`,
    size: {
      width: {
        'greater-than': 100,
        'less-than'   : 150
      },
      height: {
        'greater-than': 60,
        'less-than'   : 100
      }
    },
    drawColor: `red`,
    color: {
      red: {
        'greater-than': 200
      },
      green: {
        'less-than': 120
      },
      blue: {
        'less-than': 120
      }
    }
  });

  // Register a red rectange block
  // ---------------------------
  blockforge.register(`red-rectange-block`, {
    name: `Rectangle`,
    size: {
      width: {
        'greater-than': 200,
        'less-than'   : 390
      },
      height: {
        'greater-than': 50,
        'less-than'   : 90
      }
    },
    drawColor: `#f00`,
    color: {
      red: {
        'greater-than': 200
      },
      green: {
        'less-than': 120
      },
      blue: {
        'less-than': 120
      }
    }
  });

  // Register a blue square block
  // ---------------------------
  blockforge.register(`blue-square-block`, {
    name: `Square`,
    size: {
      width: {
        'greater-than': 80,
        'less-than'   : 100
      },
      height: {
        'greater-than': 70,
        'less-than'   : 95
      }
    },
    drawColor: `#22a9ff`,
    color: {
      red: {
        'greater-than': 0,
        'less-than'   : 100
      },
      green: {
        'greater-than': 100,
        'less-than'   : 200
      },
      blue: {
        'greater-than': 200
      }
    }
  });

  // Register a blue rectange block
  // ---------------------------
  blockforge.register(`blue-rectange-block`, {
    name: `Rectangle`,
    size: {
      width: {
        'greater-than': 100,
        'less-than'   : 125
      },
      height: {
        'greater-than': 50,
        'less-than'   : 75
      }
    },
    drawColor: `#22a9ff`,
    color: {
      red: {
        'greater-than': 0,
        'less-than'   : 100
      },
      green: {
        'greater-than': 100,
        'less-than'   : 200
      },
      blue: {
        'greater-than': 200
      }
    }
  });

  // Register a yellow square block
  // ------------------------------
  blockforge.register(`yellow-square-block`, {
    name: `Square`,
    size: {
      width: {
        'greater-than': 65,
        'less-than'   : 90
      },
      height: {
        'greater-than': 60,
        'less-than'   : 80
      }
    },
    drawColor: `#cbd072`,
    color: {
      red: {
        'greater-than': 220
      },
      green: {
        'greater-than': 200
      },
      blue: {
        'greater-than': 130,
        'less-than'   : 200
      }
    }
  });

  // Register a yellow rectangle block
  // ------------------------------
  blockforge.register(`yellow-rectangle-block`, {
    name: `Rectangle`,
    size: {
      width: {
        'greater-than': 120,
        'less-than'   : 170
      },
      height: {
        'greater-than': 50,
        'less-than'   : 85
      }
    },
    drawColor: `#cbd072`,
    color: {
      red: {
        'greater-than': 220
      },
      green: {
        'greater-than': 200
      },
      blue: {
        'greater-than': 130,
        'less-than'   : 200
      }
    }
  });

  // Start watching blocks
  // ---------------------
  blockforge.watch();

  // Set sizing variables
  // --------------------
  const topMargin = 78;

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