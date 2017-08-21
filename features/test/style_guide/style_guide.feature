Feature: Style Guide
  
  Scenario: A person wants to know what style guide to follow to create clients
    Given the server should start
      And a client browser should start up
      And a client should be able to visit /style-guide
      
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

      # Root Elements
      # -------------
      And a client should be able to see an element tagged [data-type="demo-button-1"]
      And a client should be able to see an element tagged [data-type="demo-button-2"]
      And a client browser should shut down
    Then the server should shut down
      