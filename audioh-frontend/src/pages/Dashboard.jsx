import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css';
import '../App.css';
import logo from '../assets/Logo_White.png';
import DashboardSidebar from '../components/DashboardSidebar';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newProjectName, setNewProjectName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(storedUser);
      // Get user ID from localStorage - NO MORE HARDCODED FALLBACK
      const storedUserId = localStorage.getItem('userId');
      if (storedUserId) {
        loadProjects(parseInt(storedUserId));
      } else {
        // If no user ID, redirect to login
        navigate('/login');
      }
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const loadProjects = async (userId) => {
    try {
      setLoading(true);
      console.log('Loading projects for user ID:', userId);

      const response = await axios.get(`/api/projects/user/${userId}`);

      console.log('Raw response from backend:', response.data);

      // Handle different response structures
      let projectsData = [];

      if (Array.isArray(response.data)) {
        projectsData = response.data;
        console.log('Direct array response:', projectsData);
      } else if (response.data && Array.isArray(response.data.projects)) {
        projectsData = response.data.projects;
        console.log('Nested projects array:', projectsData);
      } else if (response.data && response.data.id && response.data.projectName) {
        projectsData = [response.data];
        console.log('Single project object:', projectsData);
      } else {
        console.log('Unexpected data structure, trying to extract projects...');
        // Try to extract projects from any nested structure
        if (response.data && typeof response.data === 'object') {
          // Look for any array properties that might contain projects
          Object.values(response.data).forEach(value => {
            if (Array.isArray(value)) {
              projectsData = projectsData.concat(value);
            }
          });
        }
      }

      // Filter to ensure valid project objects
      const validProjects = projectsData.filter(item =>
        item &&
        typeof item === 'object' &&
        item.id !== undefined &&
        item.projectName !== undefined &&
        item.userId !== undefined
      );

      console.log('Final projects array:', validProjects);
      setProjects(validProjects);

    } catch (err) {
      console.error('Error loading projects:', err);
      setError('Failed to load projects');
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('userId');
    navigate('/login');
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    if (!newProjectName.trim()) return;

    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        setError('User not authenticated');
        return;
      }

      const response = await axios.post('/api/projects/create', {
        userId: parseInt(userId),
        projectName: newProjectName
      });

      // Add new project to the list
      setProjects(prev => {
        const exists = prev.some(p => p.id === response.data.id);
        if (!exists) {
          return [...prev, response.data];
        }
        return prev;
      });

      setNewProjectName('');
    } catch (error) {
      console.error('Error creating project:', error);
      setError('Failed to create project');
    }
  };

  const handleOpenProject = (projectId) => {
    localStorage.setItem('currentProjectId', projectId);
    navigate(`/projects?projectId=${projectId}`);
  };

  if (loading) {
    return <div>Loading projects...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="dashboard-layout-container">
      <DashboardSidebar />

      <div className="dashboard-main-content">
        <div className="dashboard-glass-header">
          <div className="dash-header-welcome">
            <h1 className="projects-title">Dashboard</h1>
            <p className="user-info">Welcome back, <span>{user}</span></p>
          </div>
          <div className="dash-header-actions">
            <button className="btn-logout" onClick={handleLogout}>Logout</button>
          </div>
        </div>

        {/* Quick Stats Row - Bulking up UI */}
        <div className="quick-stats-row">
          <div className="stat-glass-card">
            <h4>Total Projects</h4>
            <span className="stat-value">{projects.length}</span>
          </div>
          <div className="stat-glass-card">
            <h4>Recent Activity</h4>
            <span className="stat-value" style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>
              {projects.length > 0 ? new Date(projects[projects.length - 1]?.createdAt).toLocaleDateString() : 'No activity'}
            </span>
          </div>
          <div className="stat-glass-card">
            <h4>Storage Status</h4>
            <span className="stat-value" style={{ color: '#4dff78', fontSize: '1.2rem' }}>Healthy</span>
          </div>
        </div>

        <div className="projects-section">
          <div className="projects-header-row">
            <h2>Your Projects</h2>
            <form onSubmit={handleCreateProject} className="create-project-form">
              <input
                type="text"
                placeholder="New project name"
                value={newProjectName}
                onChange={(e) => setNewProjectName(e.target.value)}
                required
                className="glass-input"
              />
              <button type="submit" className="btn-primary">Create</button>
            </form>
          </div>

          {Array.isArray(projects) && projects.length > 0 ? (
            <div className="projects-grid">
              {projects.map(project => {
                if (!project || !project.id || !project.projectName) return null;
                return (
                  <div key={project.id} className="project-glass-card">
                    <div className="project-card-info">
                      <h3>{project.projectName}</h3>
                      <p>Created: {new Date(project.createdAt).toLocaleDateString()}</p>
                    </div>
                    <button className="btn-secondary action-button" onClick={() => handleOpenProject(project.id)}>
                      Open Project
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="empty-projects-state">
              <p>No projects yet. Create your first project above!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;