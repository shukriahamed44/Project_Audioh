import { useState } from 'react';
import axios from 'axios';

const QuickScribe = ({ onAddFile }) => {
  const [file, setFile] = useState(null);
  const [transcription, setTranscription] = useState("");
  const [isTranscribing, setIsTranscribing] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsTranscribing(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('/api/transcribe', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      setTranscription(response.data);
      console.log("Transcription successful:");

      // Pass transcription back to parent component
      if (onAddFile) {
        onAddFile(response.data);
      }
    } catch (error) {
      console.error("Error transcribing the audio file:", error);
      if (error.response) {
        console.error("Server response:", error.response.data);
        console.error("Status code:", error.response.status);
        console.error("Headers:", error.response.headers);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error setting up request:", error.message);
      }
    } finally {
      setIsTranscribing(false);
    }
  };

  return (
    <div className="Quickscribe-container">
      <h1>Add files here</h1>
      <div className="file-input">
        <input type="file" accept="audio/*" onChange={handleFileChange} />
      </div>
      <button
        className="upload-button"
        onClick={handleUpload}
        disabled={!file || isTranscribing}
      >
        {isTranscribing ? 'Transcribing...' : 'Transcribe and Add'}
      </button>

      {transcription && (
        <div className="transcription-result">
          <h2>Transcription Result</h2>
          <p>{transcription}</p>
        </div>
      )}
    </div>
  );
}

export default QuickScribe;