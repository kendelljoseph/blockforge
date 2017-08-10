/*eslint no-unused-vars: [0] no-console: ["error", { allow: ["info", "error"] }]*/
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
  Then(/^the server should start/, function(done){
    this.serverData.should.be.an.object;
    this.serverData.options.should.be.an.object;
    this.server(this.serverData.options)
      .then(({server}) => {
        this.activeServer = server;
        done();      
      })
      .catch((error) => {
        console.error(`Oops, the test server couldn't start!`.red, error);
      });
  });
  
  Then(/^the server should shut down$/, function(done){
    expect(this.activeServer).to.exist;
    this.activeServer.close((error) => {
      expect(error).to.not.exist;
      done();
    });
  });
  
  Given(/^the server has dependencies$/, function(done){
    this.dependencies.should.be.an.object;
    done();
  });
  
  Given(/^the server (.*) dependency is installed$/, function(name, done){
    this.dependencies[name].should.exist;
    done();
  });
  
  Given(/^the server has messages$/, function(done){
    this.serverMessages.should.be.an.object;
    done();
  });
  
  Given(/^the server should have \ban?\b (.*) message$/, function(name, done){
    this.serverMessages[name].should.exist;
    done();
  });
});