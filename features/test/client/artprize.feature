Feature: Artprize demo
  
  Scenario: A person wants to visit the artprize demo
    Given the server should start
      And a client browser should start up
      And a client should be able to visit /artprize
      
      # Title
      # -----
      And a client should be able to see an element tagged title
      
      # Meta tags
      # ---------
      And a client should be able to see an element tagged meta[content="user-scalable=no"]
      And a client should be able to see an element tagged meta[content="width=device-width, initial-scale=1"]
      
      # CSS
      # ---
      And a client should be able to see an element tagged link[href="/library/bower_components/normalize-css/normalize.css"]
      And a client should be able to see an element tagged link[href="/library/bower_components/mocha/mocha.css"]
      And a client should be able to see an element tagged link[href="stylesheets/style.css"]
      
      # JavaScript Dependencies
      # -----------------------
      And a client should be able to see an element tagged script[src="/library/bower_components/underscore/underscore-min.js"]
      And a client should be able to see an element tagged script[src="/library/bower_components/mocha/mocha.js"]
      And a client should be able to see an element tagged script[src="/library/bower_components/chai.min/index.js"]
      And a client should be able to see an element tagged script[src="/library/bower_components/angular/angular.min.js"]
      And a client should be able to see an element tagged script[src="/library/bower_components/angular-route/angular-route.min.js"]
      And a client should be able to see an element tagged script[src="/library/bower_components/three.js/build/three.min.js"]
      And a client should be able to see an element tagged script[src="/library/bower_components/tracking/src/tracking.js"]
      And a client should be able to see an element tagged script[src="app.module.js"]
      And a client should be able to see an element tagged script[src="controllers/root/root.controller.js"]
      And a client should be able to see an element tagged script[src="controllers/dashboard/dashboard.controller.js"]
      And a client should be able to see an element tagged script[src="controllers/test/test.controller.js"]
      
      # Temporary items
      # ---------------
      And a client should be able to see an element tagged script[data-type="socket_io_temp"]
      
      # Root Elements
      # -------------
      And a client should be able to see an element tagged [ng-app="blockforge"]
      And a client browser should shut down
    Then the server should shut down
      