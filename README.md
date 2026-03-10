# Project Audio

Project Audio is a modern, AI-powered web application designed for high-fidelity audio transcription and project management. It leverages OpenAI's Whisper model to convert speech to text with enterprise-grade accuracy, wrapped in a premium, glassmorphic user interface.

## Architecture Overview

The system is built on a decoupled architecture for maximum scalability and maintainability:

*   **Frontend**: React.js powered by Vite, featuring a custom CSS design system utilizing glassmorphism and dynamic gradient animations.
*   **Backend**: Spring Boot 3 (Java) providing a secure REST API and managing the core business logic.
*   **Database**: MySQL for robust data persistence (Users, Projects, Audio Metadata, and Notes).
*   **AI Integration**: Spring AI framework directly interfacing with the OpenAI API for seamless audio streaming and transcription.

<img width="4717" height="3145" alt="in_3" src="https://github.com/user-attachments/assets/bbc790c7-8af1-46d6-8532-5bcf1e6251fd" />


## Key Features

*   **Real-time Audio Transcription**: Upload audio files (MP3, WAV, M4A) and receive highly accurate text transcriptions powered by OpenAI.
*   **Project Workspaces**: Organize transcriptions into dedicated project folders.
*   **Interactive Notes**: Add, edit, and delete custom notes alongside audio transcriptions within the Bento-grid styled dashboard.
*   **Secure Authentication**: JWT-based user authentication managed securely by Spring Security.
*   **Premium UX**: A responsive, visually striking interface with custom micro-animations and a tailored color palette.

## Prerequisites

Before running the application locally, ensure you have the following installed:

*   Node.js (v18 or higher) and npm
*   Java Development Kit (JDK) 17 or higher
*   Maven
*   MySQL Server (running locally or remotely)
*   An active OpenAI API key

## Local Development Setup

### 1. Database Configuration

Create a MySQL database for the application. The default configuration expects a database named `audio_db`. Ensure your local MySQL server is running.

### 2. Backend Setup (Spring Boot)

1. Navigate to the backend directory:
   ```bash
   cd audio/audio
   ```

2. Environment Configuration:
   Create a `.env` file in the `audio/audio` directory and add your OpenAI API key:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   ```
   *Note: Ensure the `.env` file is added to your `.gitignore` to prevent committing sensitive keys.*

3. Update Database Credentials:
   Verify or update the `src/main/resources/application.properties` file with your MySQL username and password.

4. Start the Backend Server:
   ```bash
   ./mvnw spring-boot:run
   ```
   The backend will start on `http://localhost:8081`.

### 3. Frontend Setup (React/Vite)

1. Navigate to the frontend directory:
   ```bash
   cd audioh-frontend
   ```

2. Install Dependencies:
   ```bash
   npm install
   ```

3. Start the Development Server:
   ```bash
   npm run dev
   ```
   The frontend will start on `http://localhost:5173`. The Vite development server is configured to proxy API requests to the local backend.

## Usage

1. Open your browser and navigate to the frontend URL (`http://localhost:5173`).
2. Create an account or log in.
3. Create a new project workspace.
4. Navigate to the QuickScribe module within the project.
5. Upload a supported audio file and initiate the transcription process.
6. The transcribed text will appear with a progressive reveal animation, and the file will be saved as a card in your project view, where you can append notes.

## Security Considerations

*   **API Keys**: Never hardcode API keys. Always use environment variables (`.env`) for local development and secure secrets management in CI/CD pipelines or hosting platforms.
*   **CORS**: The backend is configured to accept requests from the frontend origin. Ensure CORS settings are updated before deploying to production.

## License

All rights reserved.
