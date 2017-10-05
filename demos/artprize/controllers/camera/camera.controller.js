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
        'greater-than': 30,
        'less-than'   : 60
      },
      height: {
        'greater-than': 30,
        'less-than'   : 60
      }
    },
    drawColor: `red`,
    color: {
      red: {
        'greater-than': 150
      },
      green: {
        'less-than': 100
      },
      blue: {
        'less-than': 100
      }
    }
  });

  // Register a red rectangle block
  // ---------------------------
  blockforge.register(`red-rectangle-block`, {
    name: `Rectangle`,
    size: {
      width: {
        'greater-than': 60,
        'less-than'   : 100
      },
      height: {
        'greater-than': 30,
        'less-than'   : 60
      }
    },
    drawColor: `#f00`,
    color: {
      red: {
        'greater-than': 150
      },
      green: {
        'less-than': 100
      },
      blue: {
        'less-than': 100
      }
    }
  });

  // Register a blue square block
  // ---------------------------
  blockforge.register(`blue-square-block`, {
    name: `Square`,
    size: {
      width: {
        'greater-than': 30,
        'less-than'   : 60
      },
      height: {
        'greater-than': 30,
        'less-than'   : 60
      }
    },
    drawColor: `#1e4aa3`,
    color: {
      red: {
        'less-than'   : 100
      },
      green: {
        'less-than'   : 160
      },
      blue: {
        'greater-than': 130
      }
    }
  });

  // Register a blue rectangle block
  // ---------------------------
  blockforge.register(`blue-rectangle-block`, {
    name: `Rectangle`,
    size: {
      width: {
        'greater-than': 60,
        'less-than'   : 100
      },
      height: {
        'greater-than': 30,
        'less-than'   : 60
      }
    },
    drawColor: `#1e4aa3`,
    color: {
      red: {
        'less-than'   : 100
      },
      green: {
        'less-than'   : 190
      },
      blue: {
        'greater-than': 130
      }
    }
  });

  // Register a green square block
  // -----------------------------
  blockforge.register(`green-square-block`, {
    name: `Square`,
    size: {
      width: {
        'greater-than': 30,
        'less-than'   : 60
      },
      height: {
        'greater-than': 30,
        'less-than'   : 60
      }
    },
    drawColor: `#11754b`,
    color: {
      red: {
        'less-than': 100
      },
      green: {
        'greater-than': 90
      },
      blue: {
        'less-than'   : 100
      }
    }
  });

  // Register a green rectangle block
  // ------------------------------
  blockforge.register(`green-rectangle-block`, {
    name: `Rectangle`,
    size: {
      width: {
        'greater-than': 60,
        'less-than'   : 100
      },
      height: {
        'greater-than': 30,
        'less-than'   : 60
      }
    },
    drawColor: `#11754b`,
    color: {
      red: {
        'less-than': 100
      },
      green: {
        'greater-than': 90
      },
      blue: {
        'less-than'   : 100
      }
    }
  });

  // Start watching blocks
  // ---------------------
  blockforge.watch();

  // Set sizing variables
  // --------------------
  const topMargin = 90;

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
}]);