Feature: The list of demos

  Scenario: A person wants to see a list of demos available
    Given the server should start
      And a client browser should start up
      And a client should be able to visit /

      # Title
      # -----
      And a client should be able to see an element tagged title containing the text value Demos

      # Root Elements
      # ---------
      And a client should be able to see an element tagged h1[data-type="demos"] containing the text value Demos
      And a client should be able to see an element tagged a[href="/artprize"] containing the text value ArtPrize Demo
      And a client should be able to see an element tagged h1[data-type="style-guide"] containing the text value Style Guide
      And a client should be able to see an element tagged a[href="/style-guide"] containing the text value Style Guide

      And a client browser should shut down
    Then the server should shut down
