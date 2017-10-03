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

    this.socket.on(`connect`, () => {
      console.info(`socket connected...`);
    });

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

    // Listen to events on this channel
    // --------------------------------
    this.socket.on(event, handler);
  }

  // Trigger events
  // --------------
  trigger(event, data = {}) {
    if(!event || !event.length) throw Error({message: `Event trigger is missing a name`});
    this.socket.emit(event, data);
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

    // Block sender
    // ------------
    const sendBlocks = (blocks) => {

      // Send the blocks to the server
      // -----------------------------
      this.socket.emit(`blocks`, blocks);
    };

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

        // Add this block to the list of detected blocks
        // ---------------------------------------------
        if(isRightSize){
          blocks.push({
            id       : this.generateHash(6),
            name     : blockName,
            x        : block.x,
            y        : block.y,
            label    : block.color
          });
        }

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
          if(isSameLine) {
            line.push(otherBlock);
            const lineId = otherBlock.lineId || this.generateHash(6);

            block.lineId = lineId;

            if(!otherBlock.lineId) otherBlock.lineId = lineId;
          }
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

      // Get just the blocks by lines
      // ----------------------------
      let lines = blocks.map((block) => {
        return block.line;
      });

      // Block group storage
      // -------------------
      let group = {};

      // Group blocks by line
      // --------------------
      lines.forEach((line, i) => {
        line.forEach((block) => {
          // Get the next group
          // ------------------
          const nextGroup = group[block.lineId] ? group[block.lineId] : [];

          // Check if the block exists in the group
          // --------------------------------------
          const existingBlock = nextGroup.find((lineBlock) => {
            return lineBlock.id == block.id;
          });

          // Add the block to the group if it is not already there
          // -----------------------------------------------------
          if(!existingBlock) nextGroup.push(block);

          // Add the line to the group
          // -------------------------
          if(!group[block.lineId]) group[block.lineId] = nextGroup;

          // Delete the line information from the block
          // ------------------------------------------
          delete block.line;
        });
      });

      // Get the max values from the group
      // ---------------------------------
      let maxValues = [];
      Object.keys(group).forEach((groupId) => {
        let blockGroup = group[groupId];
        let y          = blockGroup.reduce((block, nextBlock) => {
          return Math.max(block.y, nextBlock.y);
        });

        maxValues.push({
          groupId, y
        });
      });

      // Sorted Blocks
      // -------------
      let sortedBlocks = [];

      // Sort the max values
      // -------------------
      maxValues.sort((groupValue) => {
        return groupValue.y;
      }).forEach(({groupId}) => {
        // Extract just the label of the block
        // -----------------------------------
        let blockLabels = group[groupId].map((block) => {
          return block.label;
        });

        // Add the extracted list to the sorted blocks list
        // ------------------------------------------------
        sortedBlocks.push(blockLabels);
      });

      // Remove all unnecessary values
      // -----------------------------
      blocks.forEach((block) => {
        canvas.fillText(`I: ${block.index}`, block.x + 5, block.y + 60);
      });

      // Send blocks
      // -----------
      if(sortedBlocks.length) sendBlocks(sortedBlocks);
    });
  }
}