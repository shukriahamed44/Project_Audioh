package com.audio.transcriber.login;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "projects")
public class Project {
    @Id
    @Column(name = "audio_id")
    private String audioId;

    @Column(name = "project_id")
    private Long projectId;

    @Column(name = "transcription")
    private String transcription;

    @Column(name = "notes")
    private String notes;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    // Add this annotation to break the circular reference
    @JsonIgnoreProperties({"projects"}) // This prevents ProjectDetail from serializing projects
    @ManyToOne
    @JoinColumn(name = "project_id", insertable = false, updatable = false)
    private ProjectDetail projectDetail;

    // Getters and setters
    public String getAudioId() { return audioId; }
    public void setAudioId(String audioId) { this.audioId = audioId; }

    public Long getProjectId() { return projectId; }
    public void setProjectId(Long projectId) { this.projectId = projectId; }

    public String getTranscription() { return transcription; }
    public void setTranscription(String transcription) { this.transcription = transcription; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public ProjectDetail getProjectDetail() { return projectDetail; }
    public void setProjectDetail(ProjectDetail projectDetail) { this.projectDetail = projectDetail; }
}