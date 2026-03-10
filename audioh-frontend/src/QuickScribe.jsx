import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './pages/Quickscribe.css';

const WORD_DELAY_MS = 100;

const QuickScribe = ({ onAddFile }) => {
  const [file, setFile] = useState(null);
  const [transcription, setTranscription] = useState("");
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [visibleWordCount, setVisibleWordCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const animationRef = useRef(null);

  const words = transcription ? transcription.split(/\s+/) : [];

  // Word-by-word reveal animation
  useEffect(() => {
    if (!isAnimating || words.length === 0) return;

    if (visibleWordCount >= words.length) {
      setIsAnimating(false);
      return;
    }

    animationRef.current = setTimeout(() => {
      setVisibleWordCount(prev => prev + 1);
    }, WORD_DELAY_MS);

    return () => clearTimeout(animationRef.current);
  }, [isAnimating, visibleWordCount, words.length]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsTranscribing(true);
    setTranscription("");
    setVisibleWordCount(0);
    setIsAnimating(false);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('/api/transcribe', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });

      // Handle both string and object responses from the API
      let transcriptionText = response.data;
      console.log("Raw API response:", typeof transcriptionText, transcriptionText);

      if (typeof transcriptionText === 'object') {
        // OpenAI may return { text: "..." } or { output: "..." }
        transcriptionText = transcriptionText.text || transcriptionText.output || JSON.stringify(transcriptionText);
      }

      setTranscription(transcriptionText);
      setVisibleWordCount(0);
      setIsAnimating(true);
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
        className={`upload-button ${isTranscribing ? 'recording-pulse-active' : ''}`}
        onClick={handleUpload}
        disabled={!file || isTranscribing}
      >
        {isTranscribing ? 'Transcribing...' : 'Transcribe and Add'}
      </button>

      {transcription && (
        <div className="transcription-result">
          <h2>Transcription Result</h2>
          <div className={`transcription-text-reveal ${isAnimating ? 'is-revealing' : 'reveal-done'}`}>
            {words.map((word, index) => (
              <span
                key={index}
                className={`reveal-word ${index < visibleWordCount ? 'word-visible' : 'word-hidden'}`}
              >
                {word}{' '}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default QuickScribe;