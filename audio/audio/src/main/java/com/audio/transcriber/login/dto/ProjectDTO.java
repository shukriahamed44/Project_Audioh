package com.audio.transcriber.login.dto;

public class ProjectDTO {
    private String audioId;
    private Long projectId;
    private String transcription;
    private String notes;
    private String projectName; // Add this for easier access
    private String createdAt;

    // Constructors
    public ProjectDTO() {}

    public ProjectDTO(String audioId, Long projectId, String transcription, String notes, String projectName, String createdAt) {
        this.audioId = audioId;
        this.projectId = projectId;
        this.transcription = transcription;
        this.notes = notes;
        this.projectName = projectName;
        this.createdAt = createdAt;
    }

    // Getters and setters
    public String getAudioId() { return audioId; }
    public void setAudioId(String audioId) { this.audioId = audioId; }

    public Long getProjectId() { return projectId; }
    public void setProjectId(Long projectId) { this.projectId = projectId; }

    public String getTranscription() { return transcription; }
    public void setTranscription(String transcription) { this.transcription = transcription; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }

    public String getProjectName() { return projectName; }
    public void setProjectName(String projectName) { this.projectName = projectName; }

    public String getCreatedAt() { return createdAt; }
    public void setCreatedAt(String createdAt) { this.createdAt = createdAt; }
}