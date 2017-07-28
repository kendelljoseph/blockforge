Feature: Server dependencies and functionality
  
  Scenario: A person wants to run a server
    Given the server has dependencies
      And the colors dependency is installed
      And the express dependency is installed
      And the bodyParser dependency is installed
      And the morgan dependency is installed
      And the _ dependency is installed
      And the cucumber dependency is installed
    Then the server should run