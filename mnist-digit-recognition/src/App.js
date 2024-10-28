import React, { useState } from 'react';
import './App.css';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [prediction, setPrediction] = useState('');
  const [imagePreview, setImagePreview] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    // Create a preview URL for the uploaded image
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file before uploading.");
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setPrediction(data.prediction); // Update state with the prediction
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to fetch prediction. Please try again.');
    }
  };

  return (
    <div className="App">
      <h1>Upload an Image for Prediction</h1>
      <label className="file-input-label" htmlFor="file-input">
        Choose a file
        <input
          type="file"
          id="file-input"
          onChange={handleFileChange}
          style={{ display: 'none' }} // Hide the input
        />
      </label>
      <button className="upload-button" onClick={handleUpload}>Upload</button>
      {imagePreview && (
        <div className="image-preview">
          <h2>Uploaded Image:</h2>
          <img
            src={imagePreview}
            alt="Uploaded"
            className="preview-image"
          />
        </div>
      )}
      {prediction && <h2 className="prediction">Predicted Digit: {prediction}</h2>}
    </div>
  );
}

export default App;
