import {useState} from 'react';
//import './QuickScribe.css'; // Assuming you have a CSS file for styling
import axios from 'axios';


const QuickScribe = () => {
    const [file, setfile] = useState(null);
    const [transcription, setTranscription] = useState("");

    // Function to handle file selection and set the file state
    // This function is triggered when the user selects a file
    const handleFileChange = (e) => {
        setfile(e.target.files[0]);
    };

    // Function to handle file upload and transcription (stores the transcription result in 'response')
    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('https://localhost:8080', formData,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            setTranscription(response.data.transcription);
        } catch (error) {
            console.error("Error transcribbbing the audio filee", error);
        }
    };



    return(
        <div className ="Quickscribe-container">
            <h1>Add files here</h1>
            <div className = "file-input">
                <input type= "file" accept="audio/*" on onChange={handleFileChange}/>
            </div>
            <button className ="upload-button" onClick = {handleUpload}>Upload and Transcribe</button>

            <div className = "transcription-result">
                <h2>Transcription Result</h2>
                <p>{transcription}</p>
            </div>
        </div>
    );
}

export default QuickScribe;