Feature: The server should have a set of dependant modules installed
  
  Scenario: A person wants to run a server
    Given the server has dependencies
      And the colors dependency is installed
      And the express dependency is installed
      And the bodyParser dependency is installed
      And the _ dependency is installed
      And the cucumber dependency is installed
    Then the server should run