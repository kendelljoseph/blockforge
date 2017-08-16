Feature: The list of demos
  
  Scenario: A person wants to see a list of demos available
    Given the server should start
      And a client browser should start up
      And a client should be able to visit /
      
      # Title
      # -----
      And a client should be able to see an element tagged title
      
      # Root Elements
      # ---------
      And a client should be able to see an element tagged h1
      And a client should be able to see an element tagged a[href="/artprize"]

      And a client browser should shut down
    Then the server should shut down
      