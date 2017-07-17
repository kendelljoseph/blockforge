/*eslint no-unused-vars: [0]*/

// Dependencies
// ------------
const chai     = require("chai");
const should   = chai.should();
const expect   = chai.expect;
const {defineSupportCode: cucumber} = require(`cucumber`);

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
  
  Then(/^the server should run$/, function(done){
    this.serverData.should.be.an.object;
    this.serverData.options.should.be.an.object;
    this.server(this.serverData.options)
      .then((app) => {
        done();      
      });
  });
});