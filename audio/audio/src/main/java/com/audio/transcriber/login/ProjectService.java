package com.audio.transcriber.login;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ProjectService {

    @Autowired
    private ProjectDetailRepository projectDetailRepository;

    @Autowired
    private ProjectRepository projectRepository;

    /// constructor
    public ProjectService(ProjectDetailRepository projectDetailRepository, ProjectRepository projectRepository) {
    }


    public List<ProjectDetail> getUserProjects(Long userId) {
        return projectDetailRepository.findByUserId(userId);
    }

    public ProjectDetail createProject(Long userId, String projectName) {
        ProjectDetail projectDetail = new ProjectDetail();
        projectDetail.setUserId(userId);
        projectDetail.setProjectName(projectName);
        return projectDetailRepository.save(projectDetail);
    }

    public Project createProjectFile(Long projectId, String audioId, String transcription) {
        Project project = new Project();
        project.setAudioId(audioId);
        project.setProjectId(projectId);
        project.setTranscription(transcription);
        project.setNotes(null); // Default to null
        return projectRepository.save(project);
    }

    public List<Project> getProjectFiles(Long projectId) {
        return projectRepository.findByProjectId(projectId);
    }

    public void deleteProjectFile(String audioId) {
        projectRepository.deleteById(audioId);
    }

    public Project updateNotes(String audioId, String notes) {
        Project project = projectRepository.findById(audioId)
                .orElseThrow(() -> new RuntimeException("Project not found"));
        project.setNotes(notes);
        return projectRepository.save(project);
    }

    public void deleteNotes(String audioId) {
        Project project = projectRepository.findById(audioId)
                .orElseThrow(() -> new RuntimeException("Project not found"));
        project.setNotes(null);
        projectRepository.save(project);
    }

    public Optional<ProjectDetail> getProjectById(Long projectId) {
        return projectDetailRepository.findById(projectId);
    }
}