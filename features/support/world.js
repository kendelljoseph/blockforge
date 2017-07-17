// Testing World Globals
// ---------------------
const {defineSupportCode: cucumber} = require(`cucumber`);

// Support
// -------
const directory = process.cwd();

cucumber(({setWorldConstructor}) => {
  setWorldConstructor(function(){
    // General Data Storage
    // --------------------
    this.data         = {};
    
    // Dependencies
    // ------------
    this.dependencies = require(`${directory}/server_dependencies`);
    
    // Server
    // ------
    this.server       = require(`${directory}/server`);
    
    // Server Data
    // -----------
    this.serverData   = require(`${directory}/features/data/server`);
  });
});