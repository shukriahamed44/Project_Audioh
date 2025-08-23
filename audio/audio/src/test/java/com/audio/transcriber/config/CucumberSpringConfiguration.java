package com.audio.transcriber.config;

import com.audio.transcriber.AudioApplication;
import com.audio.transcriber.runner.CucumberTestRunner;
import io.cucumber.spring.CucumberContextConfiguration;
import org.springframework.boot.test.context.SpringBootTest;

// This tells Cucumber to use Spring Boot for step definitions
@CucumberContextConfiguration
//@SpringBootTest(classes = AudioApplication.class)  // Your main Spring Boot app class
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class CucumberSpringConfiguration {
    // This class can be empty
}
