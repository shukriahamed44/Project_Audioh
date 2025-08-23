Feature: Create a new project

  Scenario: Successfully create a new project
    Given I have a project name "test_project_alpha" and user id 21
    When I create the project
    Then the project should be saved successfully
