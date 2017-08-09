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
  When(/^a client browser should start up$/, function(){
    const seleniumWebdriver = require("selenium-webdriver");
    this.webdriver          = seleniumWebdriver;
    return this.driver    = new seleniumWebdriver.Builder()
      .forBrowser(`chrome`)
      .build();
  });
  
  When(/^a client browser should shut down$/, function(){
    return this.driver.quit();
  });
  
  When(/^a client should be able to visit (.*)$/, function(path){
    return this.driver.get(`localhost:${this.serverData.options.port}${path}`);
  });

  When(/^a client should be able to see an element tagged (.*)$/, function(tag){
    return this.driver.findElement(this.webdriver.By.css(`${tag}`));
  });
});