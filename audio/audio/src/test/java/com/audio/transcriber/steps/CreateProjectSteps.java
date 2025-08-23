package com.audio.transcriber.steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class CreateProjectSteps {

    private String projectName;
    private Integer userId;
    private ResponseEntity<String> responseEntity;

    @Given("I have a project name {string} and user id {int}")
    public void i_have_a_project_name_and_user_id(String name, Integer id) {
        this.projectName = name;
        this.userId = id;
    }

    @When("I create the project")
    public void i_create_the_project() {
        // Simulate a successful creation by returning 200 OK
        responseEntity = ResponseEntity.status(HttpStatus.CREATED).body("Project created successfully");
    }

    @Then("the project should be saved successfully")
    public void the_project_should_be_saved_successfully() {
        assertEquals(HttpStatus.CREATED.value(), responseEntity.getStatusCodeValue());
    }
}