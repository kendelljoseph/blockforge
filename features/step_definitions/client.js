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
  When(/^a client browser should start up$/, function(){
    return puppeteer.launch()
      .then((browser) => {
        this.browser = browser;
        return this.browser.newPage()
          .then((page) => {
            this.page = page;
            page.on('console', (...args) => {
            for (let i = 0; i < args.length; ++i)
              console.info(`${i}: ${args[i]}`.bold.magenta);
            });
          });
      });
  });

  When(/^a client browser should shut down$/, function(){
    return this.browser.close();
  });

  When(/^a client should be able to visit (.*)$/, function(path){
    return this.page.goto(`http://localhost:${this.serverData.options.port}${path}`);
  });

  // Check for an elements existance
  // -------------------------------
  const checkElementExistance = (element) => {
    return new Promise((resolve) => {
      expect(element).to.exist;
      resolve();
    });
  };

  When(/^a client should be able to see an element with the selector (.*)$/, function(tag){
    return this.page.$(tag)
      .then(checkElementExistance);
  });

  When(/^a client should wait to be able to see an element with the selector (.*)$/, function(tag){
    return this.page.waitForSelector(tag)
      .then(() => {
        return this.page.$(tag);
      })
      .then(checkElementExistance);
  });

  // Check the inner text of an element
  // ----------------------------------
  const checkInnerText = (text) => {
    return (element) => {
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
    };
  };

  When(/^a client should wait to be able to see an element tagged (.*) containing the text value (.*)$/, function(tag, text){
    return this.page.waitForSelector(tag)
      .then(() => {
        return this.page.$(tag);
      })
      .then(checkInnerText(text));
  });

  When(/^a client should be able to see an element tagged (.*) containing the text value (.*)$/, function(tag, text){
    return this.page.$(tag)
      .then(checkInnerText(text));
  });
});