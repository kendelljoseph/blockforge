Feature: The server should have a module that models the messages it can send
  
  Scenario: The server wants to report an error or send a message
    Given the server has messages
    Then the server should have a noAppDefined message
      And the server should have a noClientFolderDefined message
      And the server should have a serverOnline message
      And the server should have a genericError message