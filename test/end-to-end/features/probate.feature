Feature: Probate
  As a probate service user
  I need an introduction page
  so that I know what the PCQ service is about.


  Scenario: Probate CITIZEN invokes pcq
    Given  I am a probate Citizen user
    When I invoke the PCQs task
    Then I am presented with the PCQ Intro page
    And continue button exists

