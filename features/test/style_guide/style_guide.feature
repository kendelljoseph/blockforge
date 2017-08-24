Feature: Style Guide

  Scenario: A person wants to know what style guide to follow to create clients
    Given the server should start
      And a client browser should start up
      And a client should be able to visit /style-guide

      # Title
      # -----
      And a client should be able to see an element tagged title containing the text value Style Guide

      # Meta tags
      # ---------
      And a client should be able to see an element with the selector meta[content="user-scalable=no"]
      And a client should be able to see an element with the selector meta[content="width=device-width, initial-scale=1"]

      # CSS
      # ---
      And a client should be able to see an element with the selector link[href="/library/bower_components/normalize-css/normalize.css"]
      And a client should be able to see an element with the selector link[href="stylesheets/style.css"]

      # Root Elements
      # -------------
      And a client should be able to see an element tagged [data-type="demo-button-1"] containing the text value DEMO BUTTON 1
      And a client should be able to see an element tagged [data-type="demo-button-2"] containing the text value DEMO BUTTON 2
      And a client browser should shut down
    Then the server should shut down
