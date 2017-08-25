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
  // Browser
  // -------
  When(/^a client browser should start up$/, function(){
    return puppeteer.launch()
      .then((browser) => {
        this.browser = browser;
        return this.browser.newPage()
          .then((page) => {
            this.page = page;
            page.on(`console`, (...args) => {
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

        element.evaluate(() => {
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

  // Check the properties of an element
  // ----------------------------------
  const checkProperties = (attribute, value, property) => {
    return (element) => {
      return new Promise((resolve, reject) => {
        expect(element).to.exist;

        element.evaluate(() => {
          let attributes = {};
          for (let i = 0, atts = this.attributes, n = atts.length, arr = []; i < n; i++){
            attributes[atts[i].nodeName] = this.getAttribute(atts[i].nodeName);
          }

          return attributes;
        }).then((result) => {

          if(typeof value === "string"){
            value = value.split("__")[1] ? "#" + value.split("__")[1] : value;
          }

          expect(result).to.exist;
          expect(result[attribute]).to.exist;
          if(property){
            expect(result[attribute][property]).to.equal(value);
            return;
          }
          expect(result[attribute]).to.equal(value);
        })
        .then(resolve)
        .catch(reject);
      });
    };
  };

  When(/^a client should see an element tagged (.*) with the attribute (.*) with the value set to (.*)$/, function(tag, attribute, value){
    return this.page.$(tag)
      .then(checkProperties(attribute, value));
  });

  When(/^a client should see an element tagged (.*) with the attribute (.*) with the property (.*) set to (.*)$/, function(tag, attribute, property, value){
    return this.page.$(tag)
      .then(checkProperties(attribute, value, property));
  });

  When(/^a client can see an element tagged (.*) with the attribute (.*) with the property (.*) set to a number (.*)$/, function(tag, attribute, property, value){
    return this.page.$(tag)
      .then(checkProperties(attribute, Number(value), property));
  });

  // Actions
  // -------
  When(/^a client clicks on an element tagged (.*)$/, function(tag){
    return this.page.click(tag);
  });
});