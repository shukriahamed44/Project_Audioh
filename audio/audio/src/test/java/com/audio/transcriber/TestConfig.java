// File: ProjectServiceTests.java (or separate file)
package com.audio.transcriber;

import com.audio.transcriber.login.ProjectDetailRepository;
import com.audio.transcriber.login.ProjectRepository;
import org.mockito.Mockito;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

// Test config to provide mocked beans
@Configuration
 class TestConfig {
    @Bean
    public ProjectDetailRepository projectDetailRepository() {
        return Mockito.mock(ProjectDetailRepository.class);
    }

    @Bean
    public ProjectRepository projectRepository() {
        return Mockito.mock(ProjectRepository.class);
    }
}