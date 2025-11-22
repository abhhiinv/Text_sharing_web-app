import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function ViewPaste({ apiUrl, darkMode, toggleDarkMode }) {
  const { uuid } = useParams();
  const [paste, setPaste] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPaste();
  }, [uuid]);

  const fetchPaste = async () => {
    try {
      const response = await fetch(`${apiUrl}/pastes/${uuid}`);
      
      if (!response.ok) {
        throw new Error('Paste not found');
      }

      const data = await response.json();
      setPaste(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(paste.content);
    alert('Copied to clipboard!');
  };

  if (loading) {
    return (
      <div className="min-vh-100 bg-light d-flex align-items-center justify-content-center">
        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="btn btn-outline-secondary position-fixed top-0 end-0 m-3"
          style={{ zIndex: 1050 }}
        >
          {darkMode ? '☀️ Light' : '🌙 Dark'}
        </button>
        
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-vh-100 bg-light py-5">
        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="btn btn-outline-secondary position-fixed top-0 end-0 m-3"
          style={{ zIndex: 1050 }}
        >
          {darkMode ? '☀️ Light' : '🌙 Dark'}
        </button>
        
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="card shadow-sm">
                <div className="card-body p-5 text-center">
                  <h1 className="card-title h3 text-danger mb-3">Error</h1>
                  <p className="text-muted mb-4">{error}</p>
                  <Link to="/" className="btn btn-primary">
                    Go Home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100 bg-light py-5">
      {/* Dark Mode Toggle */}
      <button
        onClick={toggleDarkMode}
        className="btn btn-outline-secondary position-fixed top-0 end-0 m-3"
        style={{ zIndex: 1050 }}
      >
        {darkMode ? '☀️ Light' : '🌙 Dark'}
      </button>
      
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10 col-xl-8">
            <div className="card shadow-sm">
              <div className="card-body p-4 p-md-5">
                {/* Header */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h1 className="card-title h3 mb-0">Shared Text</h1>
                  <div className="d-flex gap-2">
                    <button 
                      onClick={handleCopy} 
                      className="btn btn-success btn-sm"
                    >
                      📋 Copy
                    </button>
                    <Link to="/" className="btn btn-primary btn-sm">
                      🏠 Home
                    </Link>
                  </div>
                </div>

                {/* Meta Info */}
                <div className="text-muted small mb-3 pb-3 border-bottom">
                  Created: {new Date(paste.created_at).toLocaleString()}
                </div>

                {/* Content */}
                <pre 
                  className="bg-light p-3 rounded border font-monospace small"
                  style={{ 
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                    maxHeight: '600px',
                    overflowY: 'auto'
                  }}
                >
                  {paste.content}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewPaste;