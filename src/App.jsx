import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [image, setImage] = useState(null);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!image) return alert('Please select an image!');
    const formData = new FormData();
    formData.append('image', image);

    try {
      setLoading(true);
      const response = await axios.post('http://localhost:5000/extract', formData);
      setText(response.data.extracted_text);
    } catch (error) {
      console.error(error);
      alert('Failed to extract text');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <div className="card">
        <h1 className="title">Text Extractor</h1>
        <p className="subtitle">Upload an image to extract its text content</p>

        <input 
          type="file" 
          accept="image/*" 
          onChange={handleImageChange} 
          className="file-input"
        />

        <button onClick={handleUpload} className="upload-btn">
          {loading ? 'Extracting...' : 'Extract Text'}
        </button>

        {text && (
          <div className="result">
            <h2>Extracted Text</h2>
            <pre>{text}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
