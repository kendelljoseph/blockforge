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
      And a client should be able to see an element tagged link[href="stylesheets/style.css"]

      # JavaScript Dependencies
      # -----------------------
      And a client should be able to see an element tagged script[src="/library/bower_components/underscore/underscore-min.js"]
      And a client should be able to see an element tagged script[src="/library/bower_components/angular/angular.min.js"]
      And a client should be able to see an element tagged script[src="/library/bower_components/angular-route/angular-route.min.js"]
      And a client should be able to see an element tagged script[src="/library/bower_components/three.js/build/three.min.js"]
      And a client should be able to see an element tagged script[src="/library/bower_components/tracking/src/tracking.js"]
      And a client should be able to see an element tagged script[src="/library/bower_components/aframe.min/index.js"]
      And a client should be able to see an element tagged script[src="app.module.js"]
      And a client should be able to see an element tagged script[src="controllers/root/root.controller.js"]
      And a client should be able to see an element tagged script[src="controllers/viewer/viewer.controller.js"]
      And a client should be able to see an element tagged script[src="controllers/camera/camera.controller.js"]

      # Root Elements
      # -------------
      And a client should be able to see an element tagged [ng-app="blockforge"]
      And a client should be able to see an element tagged ng-view
      And a client should be able to see an element tagged ng-view > demo-header
      And a client should be able to see an element tagged ng-view > demo-header > artprize-logo
      And a client should be able to see an element tagged ng-view > demo-header > artprize-logo > img[id="artprize_logo"][src="/media/images/artprize_9_logo.png"]
      And a client should be able to see an element tagged ng-view > demo-header > demo-title
      And a client should be able to see an element tagged ng-view > demo-content
      And a client should be able to see an element tagged ng-view > demo-content > demo-bold-text
      And a client should be able to see an element tagged ng-view > demo-content > demo-button-options
      And a client should be able to see an element tagged ng-view > demo-content > demo-button-options > demo-button[data-type="camera"]
      And a client should be able to see an element tagged ng-view > demo-content > demo-button-options > demo-button[data-type="viewer"]
      And a client browser should shut down
    Then the server should shut down