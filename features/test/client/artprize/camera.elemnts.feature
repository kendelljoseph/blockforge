Feature: ArtPrize demo camera elements

  Scenario: A person vistis the ArtPrize demo camera
    Given the server should start
      And a client browser should start up
      And a client should be able to visit /artprize/
      And a client should wait to be able to see an element tagged ng-view > demo-content > demo-button-options > demo-button[data-type="camera"] containing the text value CAMERA
    When a client clicks on an element tagged demo-button[data-type="camera"]
    Then a client should wait to be able to see an element with the selector ng-view > demo-content
      And a client should wait to be able to see an element tagged ng-view > demo-content > demo-bold-text containing the text value Point this device's camera at the blocks.
      And a client should see an element tagged ng-view > demo-content > video with the attribute id with the value set to video
      And a client should see an element tagged ng-view > demo-content > canvas with the attribute id with the value set to canvas
      And a client browser should shut down
    Then the server should shut down