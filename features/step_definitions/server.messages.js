/*eslint no-unused-vars: [0]*/

// Dependencies
// ------------
const dependencies = require(`${process.cwd()}/server_dependencies`);
const chai         = dependencies.chai;
const should       = chai.should();
const expect       = chai.expect;
const {defineSupportCode: cucumber} = dependencies.cucumber;

// Request Actions
// ---------------
cucumber(({Given, When, Then}) => {
  Given(/^the server has messages$/, function(done){
    this.serverMessages.should.be.an.object;
    done();
  });
  
  Given(/^the server should have \ban?\b (.*) message$/, function(name, done){
    this.serverMessages[name].should.exist;
    done();
  });
});