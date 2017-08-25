Feature: ArtPrize demo viewer elements

  Scenario: A person vistis the ArtPrize demo viewer
    Given the server should start
      And a client browser should start up
      And a client should be able to visit /artprize/
      And a client should wait to be able to see an element tagged ng-view > demo-content > demo-button-options > demo-button[data-type="viewer"] containing the text value VIEWER
    When a client clicks on an element tagged demo-button[data-type="viewer"]
    Then a client should wait to be able to see an element with the selector ng-view > a-scene
      And a client can see an element tagged ng-view > a-scene > a-box with the attribute position with the property x set to a number -1
      And a client can see an element tagged ng-view > a-scene > a-box with the attribute position with the property y set to a number 0.5
      And a client can see an element tagged ng-view > a-scene > a-box with the attribute position with the property z set to a number -3
      And a client can see an element tagged ng-view > a-scene > a-box with the attribute rotation with the property x set to a number 0
      And a client can see an element tagged ng-view > a-scene > a-box with the attribute rotation with the property y set to a number 25
      And a client can see an element tagged ng-view > a-scene > a-box with the attribute rotation with the property z set to a number 0
      And a client should see an element tagged ng-view > a-scene > a-box with the attribute color with the value set to __afe890
      And a client can see an element tagged ng-view > a-scene > a-sphere with the attribute position with the property x set to a number 0
      And a client can see an element tagged ng-view > a-scene > a-sphere with the attribute position with the property y set to a number 1.25
      And a client can see an element tagged ng-view > a-scene > a-sphere with the attribute position with the property z set to a number -5
      And a client should see an element tagged ng-view > a-scene > a-sphere with the attribute radius with the value set to 1.25
      And a client should see an element tagged ng-view > a-scene > a-sphere with the attribute color with the value set to __EF2D5E
      And a client can see an element tagged ng-view > a-scene > a-cylinder with the attribute position with the property x set to a number 1
      And a client can see an element tagged ng-view > a-scene > a-cylinder with the attribute position with the property y set to a number 0.75
      And a client can see an element tagged ng-view > a-scene > a-cylinder with the attribute position with the property z set to a number -3
      And a client should see an element tagged ng-view > a-scene > a-cylinder with the attribute radius with the value set to 0.5
      And a client should see an element tagged ng-view > a-scene > a-cylinder with the attribute height with the value set to 1.5
      And a client should see an element tagged ng-view > a-scene > a-cylinder with the attribute color with the value set to __FFC65D
      And a client can see an element tagged ng-view > a-scene > a-plane with the attribute position with the property x set to a number 0
      And a client can see an element tagged ng-view > a-scene > a-plane with the attribute position with the property y set to a number 0
      And a client can see an element tagged ng-view > a-scene > a-plane with the attribute position with the property z set to a number -4
      And a client can see an element tagged ng-view > a-scene > a-plane with the attribute rotation with the property x set to a number -90
      And a client can see an element tagged ng-view > a-scene > a-plane with the attribute rotation with the property y set to a number 0
      And a client can see an element tagged ng-view > a-scene > a-plane with the attribute rotation with the property z set to a number 0
      And a client should see an element tagged ng-view > a-scene > a-plane with the attribute width with the value set to 4
      And a client should see an element tagged ng-view > a-scene > a-plane with the attribute height with the value set to 4
      And a client should see an element tagged ng-view > a-scene > a-plane with the attribute color with the value set to __7BC8A4
      And a client should see an element tagged ng-view > a-scene > a-sky with the attribute color with the value set to __eee
      And a client browser should shut down
    Then the server should shut down