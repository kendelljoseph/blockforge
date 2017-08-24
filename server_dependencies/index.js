// Dependencies
// ------------
/*
* All the fun modules that the server uses to run.
* They are loaded through this module for consistancy and testing.
*/

module.exports = {
  colors      : require(`colors`),
  express     : require(`express`),
  bodyParser  : require(`body-parser`),
  morgan      : require(`morgan`),
  http        : require(`http`),
  _           : require(`underscore`),
  cucumber    : require(`cucumber`),
  chai        : require(`chai`),
  neo4j       : require(`neo4j`),
  socketIo    : require(`socket.io`),
  puppeteer   : require(`puppeteer`)
};