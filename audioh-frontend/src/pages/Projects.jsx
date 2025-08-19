import React, { useState, useEffect } from 'react';
import QuickScribe from '../QuickScribe';
import './Projects.css';
import { Trash2 } from "lucide-react";

function Projects() {
  const [files, setFiles] = useState([]);
  const [projectId, setProjectId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedFileId, setExpandedFileId] = useState(null); // Track which file is expanded
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [noteText, setNoteText] = useState('');

  // Get project ID from URL or localStorage
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const projectIdFromUrl = urlParams.get('projectId');
    
    if (projectIdFromUrl) {
      setProjectId(parseInt(projectIdFromUrl));
    } else {
      const storedId = localStorage.getItem('currentProjectId');
      if (storedId) {
        setProjectId(parseInt(storedId));
      }
    }
  }, []);

  // Fetch existing projects from backend when component mounts
  useEffect(() => {
    if (projectId) {
      fetchExistingProjects(projectId);
    }
  }, [projectId]);

  const fetchExistingProjects = async (projectId) => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:8080/api/projects/${projectId}/files`);
      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }
      const data = await response.json();
      
      // Convert backend data to frontend format
      const formattedFiles = data.map(item => ({
        id: item.audioId,
        name: item.audioId, // Use audioId as the name
        transcription: item.transcription,
        notes: item.notes || null
      }));
      
      setFiles(formattedFiles);
    } catch (err) {
      setError('Failed to load existing projects');
      console.error('Error fetching projects:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddFile = async (transcription) => {
    const audioId = `audio_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const newFile = {
      id: audioId,
      name: audioId, // Show audioId as the name
      transcription: transcription,
      notes: null
    };
    
    setFiles([...files, newFile]);
    
    // Save to backend when file is added
    if (projectId) {
      await saveProjectFile(projectId, audioId, transcription);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProjectFile(id);
      setFiles(files.filter(file => file.id !== id));
      // Close any expanded view
      if (expandedFileId === id) {
        setExpandedFileId(null);
      }
      if (editingNoteId === id) {
        setEditingNoteId(null);
        setNoteText('');
      }
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  const handleExpand = (id) => {
    setExpandedFileId(expandedFileId === id ? null : id);
  };

  const handleEditNote = (id, currentNotes) => {
    setEditingNoteId(id);
    setNoteText(currentNotes || '');
  };

  const handleSaveNote = async (id) => {
    if (!noteText.trim()) return;
    
    try {
      const response = await fetch(`http://localhost:8080/api/projects/file/${id}/notes`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          notes: noteText
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to save notes');
      }
      
      // Update local state
      setFiles(files.map(file => 
        file.id === id ? { ...file, notes: noteText } : file
      ));
      
      setEditingNoteId(null);
      setNoteText('');
    } catch (error) {
      console.error('Error saving notes:', error);
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/projects/file/${id}/notes`, {
        method: 'DELETE'
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete notes');
      }
      
      // Update local state
      setFiles(files.map(file => 
        file.id === id ? { ...file, notes: null } : file
      ));
      
      if (editingNoteId === id) {
        setEditingNoteId(null);
        setNoteText('');
      }
    } catch (error) {
      console.error('Error deleting notes:', error);
    }
  };

  // Function to save project file to backend
  const saveProjectFile = async (projectId, audioId, transcription) => {
    try {
      const response = await fetch('http://localhost:8080/api/projects/add-file', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          projectId: projectId,
          audioId: audioId,
          transcription: transcription
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to save project file');
      }
      
      console.log('Project file saved successfully');
      return await response.json();
    } catch (error) {
      console.error('Error saving project file:', error);
      throw error;
    }
  };

  // Function to delete project file from backend
  const deleteProjectFile = async (audioId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/projects/file/${audioId}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete project file');
      }
      
      console.log('Project file deleted successfully');
    } catch (error) {
      console.error('Error deleting project file:', error);
      throw error;
    }
  };

  if (loading) {
    return <div>Loading projects...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="projects-container" >
      {/* Section 1: 25% width */}
      <div className="section-1">
        <QuickScribe 
          onAddFile={handleAddFile} 
          projectId={projectId}
        />
      </div>

      {/* Section 2: 40% width */}
      <div className="section-2">
        {files.length === 0 ? (
          <div className="no-files-message">
            No files added yet
          </div>
        ) : (
          <div className="bento-grid">
            {files.map((file) => (
              <div key={file.id} className="bento-card">
                {/* File Name/ID Display */}
                <div className="file-name">
                  <strong>{file.name}</strong>
                </div>
                
                {/* Transcription Preview */}
                <div className="transcription-preview">
                  {file.transcription && (
                    <button 
                      className="expand-button"
                      onClick={() => handleExpand(file.id)}
                    >
                      {expandedFileId === file.id ? 'Collapse' : 'See Transcription'}
                    </button>
                  )}
                </div>
                
                {/* Expanded Transcription */}
                {expandedFileId === file.id && file.transcription && (
                  <div className="transcription-expanded">
                    <p>{file.transcription}</p>
                  </div>
                )}
                
                {/* Notes Section */}
                <div className="notes-section">
                  {file.notes ? (
                    <div className="notes-display">
                      <p className="notes-text">{file.notes}</p>
                      <div className="notes-actions">
                        <button 
                          className="edit-note-button"
                          onClick={() => handleEditNote(file.id, file.notes)}
                        >
                          Edit
                        </button>
                        <button 
                          className="delete-note-button"
                          onClick={() => handleDeleteNote(file.id)}
                        >
                          <Trash2 size = {18}/>
                        </button>
                      </div>
                    </div>
                  ) : editingNoteId === file.id ? (
                    <div className="notes-edit">
                      <textarea
                        className="note-input"
                        value={noteText}
                        onChange={(e) => setNoteText(e.target.value)}
                        placeholder="Enter your notes here..."
                        rows="3"
                      />
                      <div className="note-buttons">
                        <button 
                          className="save-note-button"
                          onClick={() => handleSaveNote(file.id)}
                        >
                          Save Note
                        </button>
                        <button 
                          className="cancel-note-button"
                          onClick={() => {
                            setEditingNoteId(null);
                            setNoteText('');
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button 
                      className="add-note-button"
                      onClick={() => handleEditNote(file.id, '')}
                    >
                      Add Note
                    </button>
                  )}
                </div>
                
                {/* Delete Button */}
                <button 
                  className="card-button delete-button"
                  onClick={() => handleDelete(file.id)}
                >
                  D E L E T E  F I L E
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Section 3: 30% width */}
      <div className="section-3">
        <button className="action-button">Summary</button>
        <button className="action-button">Download</button>
      </div>
    </div>
  );
}

export default Projects;