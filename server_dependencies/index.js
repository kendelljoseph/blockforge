// Dependencies
// ------------
/*
* All the fun modules that the server uses to run.
* They are loaded through this module for consistancy and testing.
*/

module.exports = {
  colors    : require(`colors`),
  express   : require(`express`),
  bodyParser: require(`body-parser`),
  _         : require(`underscore`),
  cucumber  : require(`cucumber`)
};