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
  Given(/^the server has dependencies$/, function(done){
    this.dependencies.should.be.an.object;
    done();
  });
  
  Given(/^the (.*) dependency is installed$/, function(name, done){
    this.dependencies[name].should.exist;
    done();
  });
});