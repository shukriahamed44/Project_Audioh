package com.audio.transcriber.login;

import com.audio.transcriber.login.dto.ProjectDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin(origins = "http://localhost:5173")
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ProjectDetail>> getUserProjects(@PathVariable Long userId) {
        List<ProjectDetail> projects = projectService.getUserProjects(userId);
        return ResponseEntity.ok(projects);
    }

    @PostMapping("/create")
    public ResponseEntity<ProjectDetail> createProject(@RequestBody CreateProjectRequest request) {
        ProjectDetail project = projectService.createProject(request.getUserId(), request.getProjectName());
        return ResponseEntity.ok(project);
    }

    @PostMapping("/add-file")
    public ResponseEntity<Project> addProjectFile(@RequestBody AddFileRequest request) {
        System.out.println("Received request: projectId=" + request.getProjectId() +
                ", audioId=" + request.getAudioId() +
                ", transcription=" + request.getTranscription());

        try {
            Project project = projectService.createProjectFile(
                    request.getProjectId(),
                    request.getAudioId(),
                    request.getTranscription()
            );
            System.out.println("Successfully created project file with ID: " + project.getAudioId());
            return ResponseEntity.ok(project);
        } catch (Exception e) {
            System.err.println("Error creating project file: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }

    @GetMapping("/{projectId}/files")
    public ResponseEntity<List<ProjectDTO>> getProjectFiles(@PathVariable Long projectId) {
        List<Project> files = projectService.getProjectFiles(projectId);

        // Convert to DTOs to avoid circular references
        List<ProjectDTO> dtos = files.stream()
                .map(project -> {
                    String projectName = project.getProjectDetail() != null ?
                            project.getProjectDetail().getProjectName() : "Unknown";
                    return new ProjectDTO(
                            project.getAudioId(),
                            project.getProjectId(),
                            project.getTranscription(),
                            project.getNotes(),
                            projectName,
                            project.getCreatedAt() != null ? project.getCreatedAt().toString() : null
                    );
                })
                .collect(Collectors.toList());

        return ResponseEntity.ok(dtos);
    }

    @DeleteMapping("/file/{audioId}")
    public ResponseEntity<Void> deleteProjectFile(@PathVariable String audioId) {
        projectService.deleteProjectFile(audioId);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/file/{audioId}/notes")
    public ResponseEntity<Project> updateNotes(@PathVariable String audioId, @RequestBody UpdateNotesRequest request) {
        Project project = projectService.updateNotes(audioId, request.getNotes());
        return ResponseEntity.ok(project);
    }

    @DeleteMapping("/file/{audioId}/notes")
    public ResponseEntity<Void> deleteNotes(@PathVariable String audioId) {
        projectService.deleteNotes(audioId);
        return ResponseEntity.noContent().build();
    }
}

// DTO for updating notes
class UpdateNotesRequest {
    private String notes;

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
}

// DTO for creating project
class CreateProjectRequest {
    private Long userId;
    private String projectName;

    // Getters and setters
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getProjectName() { return projectName; }
    public void setProjectName(String projectName) { this.projectName = projectName; }
}

// DTO for adding file
class AddFileRequest {
    private Long projectId;
    private String audioId;
    private String transcription;

    // Getters and setters
    public Long getProjectId() { return projectId; }
    public void setProjectId(Long projectId) { this.projectId = projectId; }

    public String getAudioId() { return audioId; }
    public void setAudioId(String audioId) { this.audioId = audioId; }

    public String getTranscription() { return transcription; }
    public void setTranscription(String transcription) { this.transcription = transcription; }
}