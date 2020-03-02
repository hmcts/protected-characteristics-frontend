Feature: Probate
  As a probate service user 
  I need an introduction page 
  so that I know what the PCQ service is about.
    

  Scenario: HP 1.1: CITIZEN answers ONE question, leaves all others blank and completes
    Given I am a Citizen
    And I have logged into the PROBATE service
    And I am on the task list page
    And the optional task to answer PCQs is available and incomplete
    When I invoke the PCQs for PROBATE from the task list page
    Then I am presented with the PCQ Intro page
    And there is an opt out option
