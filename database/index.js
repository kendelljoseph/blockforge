// Database
// --------

// Dependencies
// ------------
const dependencies = require(`${process.cwd()}/server_dependencies`);
const neo4j        = dependencies.neo4j;

// Database Class
// --------------
module.exports = class Database {
  constructor(options = {}) {
    this.database = new neo4j.GraphDatabase(""); // Database info added here soon
    
    return (...args) => { return this.query(...args); };
  }
  
  // Run queries on the database
  // ---------------------------
  query(queryString, options = {}) {
    return new Promise((resolve, reject) => {
      this.database.cypher(queryString, (error, results) => {
        if(error) return reject(error);
        
        resolve(results);
      });
    });
  }
};