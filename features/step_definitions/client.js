/*eslint no-unused-vars: [0] no-console: ["error", { allow: ["info", "error"] }]*/
// Dependencies
// ------------
const dependencies = require(`${process.cwd()}/server_dependencies`);
const chai         = dependencies.chai;
const puppeteer    = dependencies.puppeteer;
const should       = chai.should();
const expect       = chai.expect;
const {defineSupportCode: cucumber} = dependencies.cucumber;

// Request Actions
// ---------------
cucumber(({Given, When, Then}) => {
  When(/^a client browser should start up$/, function(done){
    (async () => {
      this.browser = await puppeteer.launch();
      this.page    = await this.browser.newPage();
      done();
    })();
  });

  When(/^a client browser should shut down$/, function(done){
    (async () => {
      await this.browser.close();
      done();
    })();
  });

  When(/^a client should be able to visit (.*)$/, function(path, done){
    (async () => {
      await this.page.goto(`http://localhost:${this.serverData.options.port}${path}`);
      done();
    })();
  });

  When(/^a client should be able to see an element with the selector (.*)$/, function(tag){
    return this.page.$(tag)
      .then((element) => {
        return new Promise((resolve) => {
          expect(element).to.exist;
          resolve();
        });
      });
  });

  When(/^a client should be able to see an element tagged (.*) containing the text value (.*)$/, function(tag, text){
    return this.page.$(tag)
      .then((element) => {
        return new Promise((resolve, reject) => {
          expect(element).to.exist;

          element.evaluate((what) => {
            return this.innerText;
          }).then((result) => {
            expect(result).to.equal(text);
          })
          .then(resolve)
          .catch(reject);
        });
      });
  });
});