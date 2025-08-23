// File: src/test/java/com/audio/transcriber/ProjectServiceTests.java
package com.audio.transcriber;

import com.audio.transcriber.login.*;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@SpringBootTest(classes = ProjectService.class)
@Import(ProjectServiceTests.TestConfig.class)
public class ProjectServiceTests {

    // Add this to your existing TestConfig class


    @Autowired
    private ProjectDetailRepository projectDetailRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private ProjectService projectService;



    @Test
    void testCreateProjectSuccessfully() {
        // Given
        Long userId = 21L;
        String projectName = "test_project_alpha";

        ProjectDetail projectDetail = new ProjectDetail();
        projectDetail.setUserId(userId);
        projectDetail.setProjectName(projectName);

        // Mock save behavior
        when(projectDetailRepository.save(any(ProjectDetail.class))).thenReturn(projectDetail);

        // When
        ProjectDetail savedProject = projectService.createProject(userId, projectName);

        // Then
        assertNotNull(savedProject);
        assertEquals(projectName, savedProject.getProjectName());
        assertEquals(userId, savedProject.getUserId());

        verify(projectDetailRepository, times(1)).save(any(ProjectDetail.class));
    }

    // ✅ Test configuration — must be static and public
    @Configuration
    static class TestConfig {

        @Bean
        public ProjectDetailRepository projectDetailRepository() {
            return Mockito.mock(ProjectDetailRepository.class);
        }

        @Bean
        public ProjectRepository projectRepository() {
            return Mockito.mock(ProjectRepository.class);
        }

        @Bean
        public ProjectService projectService() {
            return new ProjectService(projectDetailRepository(), projectRepository());
        }
    }


}