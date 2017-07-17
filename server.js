// The Server
// ----------

// Dependencies
// ------------
const dependencies = require(`./server_dependencies`);
const colors       = dependencies.colors;

module.exports = (options = {}) => {
  
  return new Promise((resolve, reject) => {
    console.log(`The ${options.name || "unnamed"} server is running now.`.green);
    resolve();
  });
};