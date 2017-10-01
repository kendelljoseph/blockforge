/*global io, tracking */

// Blockforge
// ----------
class Blockforge {
  constructor(options = {}) {
    // Set the name
    // ------------
    this.name = options.name;

    // Set initial block settings
    // --------------------------
    this.settings = options || {};

    // Setup a socket connection
    // -------------------------
    this.socket = options.socket
      || (io ? io.connect(options.server) : undefined);

    // Setup tracking
    // --------------
    this.tracking = options.tracking || tracking;

    // Set elements
    // ------------
    this.elements = {
      video : options.video,
      canvas: options.canvas
    };

    // Line settings
    // -------------
    this.line = options.line || {tolerance: 30};

    // Registered blocks
    // -----------------
    this.registeredBlocks = [];

    return this;
  }

  // Generate a hash value
  generateHash(keyLength = 64) {
    let hash        = ``;
    const hashTable = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789`;

    for(var i=0; i < keyLength; i++){
      hash += hashTable.charAt(Math.floor(Math.random() * hashTable.length));
    }

    return hash;
  }

  // Listen to events
  // ----------------
  on(event, handler) {
    if(!event || !event.length) throw Error({message: `Event handler is missing a name`});

    // Set the channel name
    const channelName = `${this.name || ``}:${event}`;

    // Listen to events on this channel
    // --------------------------------
    this.socket.on(channelName, handler);
  }

  // Get size check
  // ---------------
  getSizeCheck(dimentions) {

    // Check color value
    // -----------------
    const valueCheck = {
      'greater-than': (value, unknownValue) => unknownValue > value,
      'less-than'   : (value, unknownValue) => unknownValue < value
    };

    // Size checking method
    // ---------------------
    return function(width, height) {
      // Unkown dimentions
      // -----------------
      const unknownDimentions = {width, height};

      // Checks
      // ------
      let checks = [];

      // Run checks on the dimention values
      // ----------------------------------
      Object.keys(dimentions).forEach((dimention) => {
        Object.keys(dimentions[dimention]).forEach((valueCheckType) => {
          checks.push(valueCheck[valueCheckType](dimentions[dimention][valueCheckType], unknownDimentions[dimention]));
        });
      });

      // Set if checks pass
      // ------------------
      let pass = true;

      // Find failing checks
      // -------------------
      let failingCheck = checks.find((check) => check === false);

      // Return the faling check if there is one
      // ---------------------------------------
      if(failingCheck === false) return failingCheck;

      return pass;
    };
  }

  // Get color check
  // ---------------
  getColorCheck(colors) {

    // Check color value
    // -----------------
    const valueCheck = {
      'greater-than': (value, unknownValue) => unknownValue > value,
      'less-than'   : (value, unknownValue) => unknownValue < value
    };

    // Color checking method
    // ---------------------
    return function(red, green, blue) {
      // Unknown Colors
      // --------------
      const unknownColors = {red, green, blue};

      // Checks
      // ------
      let checks = [];

      // Run checks on the color values
      // ------------------------------
      Object.keys(colors).forEach((color) => {
        Object.keys(colors[color]).forEach((valueCheckType) => {
          checks.push(valueCheck[valueCheckType](colors[color][valueCheckType], unknownColors[color]));
        });
      });

      // Set if checks pass
      // ------------------
      let pass = true;

      // Find failing checks
      // -------------------
      let failingCheck = checks.find((check) => check === false);

      // Return the faling check if there is one
      // ---------------------------------------
      if(failingCheck === false) return failingCheck;

      return pass;
    };
  }

  // Register a block
  // ----------------
  register(name, options = {}) {

    this.registeredBlocks[name] = {
      name     : options.name,
      drawColor: options.drawColor,
      color    : this.getColorCheck(options.color),
      size     : this.getSizeCheck(options.size)
    };
  }

  // Watch for blocks
  // ----------------
  watch(options = {}) {
    // Get the canvas to draw on
    // -------------------------
    const canvas = this.elements.canvas.getContext(`2d`);

    // Set color options
    // -----------------
    let colorOptions = [];
    Object.keys(this.registeredBlocks).forEach((blockName) => {
      // Add the color to the list of colors to track
      // --------------------------------------------
      colorOptions.push(blockName);

      // Register the color with the color tracker
      // -----------------------------------------
      this.tracking.ColorTracker.registerColor(
        blockName, this.registeredBlocks[blockName].color);
    });

    // Setup the block tracker
    // -----------------------
    const blockTracker = new tracking.ColorTracker(colorOptions);
    tracking.track(this.elements.video, blockTracker, { camera: true });

    // Start tracking blocks
    // ---------------------
    blockTracker.on(`track`, ({data}) => {
      // Clear the canvas
      // ----------------
      canvas.clearRect(0, 0, this.elements.canvas.width, this.elements.canvas.height);

      // Detected block storage
      // ----------------------
      let blocks = [];

      // Add rectanges where blocks are detected
      // ---------------------------------------
      data.forEach((block) => {
        // Get block information
        // ---------------------
        const blockName   = this.registeredBlocks[block.color].name;
        const isRightSize = this.registeredBlocks[block.color].size(block.width, block.height);

        // Do nothiing if the block is not the right size
        // ----------------------------------------------
        if(!isRightSize) return;

        // Add this block to the list of detected blocks
        // ---------------------------------------------
        blocks.push({
          id       : this.generateHash(6),
          name     : blockName,
          x        : block.x,
          y        : block.y,
          label    : block.color
        });

        // Use the block draw color
        // ------------------------
        canvas.fillStyle = this.registeredBlocks[block.color].drawColor;
        canvas.fillRect(block.x, block.y, block.width, block.height);
        canvas.font = `11px Bungee`;

        // Add the block name to the canvas
        // --------------------------------
        canvas.fillStyle = this.registeredBlocks[block.color].drawColor;
        canvas.fillText(`${isRightSize ? blockName : ``}`, block.x + 5, block.y - 5);

        // Add size information to the canvas
        // ----------------------------------
        canvas.fillStyle = `#fff`;
        canvas.fillText(`W: ${block.width}`, block.x + 5, block.y + 12);
        canvas.fillText(`H: ${block.height}`, block.x + 5, block.y + 24);
        canvas.fillText(`X: ${block.x}`, block.x + 5, block.y + 36);
        canvas.fillText(`Y: ${block.y}`, block.x + 5, block.y + 48);

      });

      // Sort and add indexes to blocks by line
      // --------------------------------------
      blocks.forEach((block) => {
        let line = [];

        // Find blocks on the same line
        // ----------------------------
        blocks.forEach((otherBlock) => {
          const isSameLine = Math.abs(block.y - otherBlock.y) <= this.line.tolerance;
          if(isSameLine) line.push(otherBlock);
        });

        // Sort the line
        // -------------
        line.sort((thisBlock, otherBlock) => {
          return thisBlock.x < otherBlock.x;
        }).reverse().forEach((sortedBlock, index) => {
          sortedBlock.index = index;
        });

        block.line = line;
      });

      // Remove x and y values
      // ---------------------
      blocks.forEach((block) => {
        canvas.fillText(`I: ${block.index}`, block.x + 5, block.y + 60);
        delete block.x;
        delete block.y;
      });
    });
  }
}