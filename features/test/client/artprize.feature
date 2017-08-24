Feature: Artprize demo

  Scenario: A person wants to visit the artprize demo
    Given the server should start
      And a client browser should start up
      And a client should be able to visit /artprize

      # Title
      # -----
      And a client should be able to see an element tagged title containing the text value Blockforge | Artprize Demo

      # Meta tags
      # ---------
      And a client should be able to see an element with the selector meta[content="user-scalable=no"]
      And a client should be able to see an element with the selector meta[content="width=device-width, initial-scale=1"]

      # CSS
      # ---
      And a client should be able to see an element with the selector link[href="/library/bower_components/normalize-css/normalize.css"]
      And a client should be able to see an element with the selector link[href="stylesheets/style.css"]

      # JavaScript Dependencies
      # -----------------------
      And a client should be able to see an element with the selector script[src="/library/bower_components/underscore/underscore-min.js"]
      And a client should be able to see an element with the selector script[src="/library/bower_components/angular/angular.min.js"]
      And a client should be able to see an element with the selector script[src="/library/bower_components/angular-route/angular-route.min.js"]
      And a client should be able to see an element with the selector script[src="/library/bower_components/tracking/src/tracking.js"]
      And a client should be able to see an element with the selector script[src="/library/bower_components/aframe.min/index.js"]
      And a client should be able to see an element with the selector script[src="app.module.js"]
      And a client should be able to see an element with the selector script[src="controllers/root/root.controller.js"]
      And a client should be able to see an element with the selector script[src="controllers/viewer/viewer.controller.js"]
      And a client should be able to see an element with the selector script[src="controllers/camera/camera.controller.js"]

      # Root Elements
      # -------------
      And a client should be able to see an element with the selector [ng-app="blockforge"]
      And a client should be able to see an element with the selector ng-view
      And a client should wait to be able to see an element with the selector ng-view > demo-header
      And a client should wait to be able to see an element with the selector ng-view > demo-header > artprize-logo
      And a client should wait to be able to see an element with the selector ng-view > demo-header > artprize-logo > img[id="artprize_logo"][src="/media/images/artprize_9_logo.png"]
      And a client should wait to be able to see an element tagged ng-view > demo-header > demo-title containing the text value VR Demo
      And a client should wait to be able to see an element with the selector ng-view > demo-content
      And a client should wait to be able to see an element tagged ng-view > demo-content > demo-bold-text containing the text value This is a ...
      And a client should wait to be able to see an element with the selector ng-view > demo-content > demo-button-options
      And a client should wait to be able to see an element tagged ng-view > demo-content > demo-button-options > demo-button[data-type="camera"] containing the text value CAMERA
      And a client should wait to be able to see an element tagged ng-view > demo-content > demo-button-options > demo-button[data-type="viewer"] containing the text value VIEWER
      And a client browser should shut down
    Then the server should shut down