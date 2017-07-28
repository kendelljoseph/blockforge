/*eslint no-unused-vars: [0]*/

// Dependencies
// ------------
const chai     = require(`chai`);
const should   = chai.should();
const expect   = chai.expect;
const {defineSupportCode: cucumber} = require(`cucumber`);

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