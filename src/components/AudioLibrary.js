import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { audioData } from '../data/libraryData';
import './AudioLibrary.css';

function AudioLibrary() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filterTranscription, setFilterTranscription] = useState('all');

  // Get unique categories
  const categories = ['All', ...new Set(audioData.map(audio => audio.category))];

  // Filter audio data
  const filteredAudio = audioData.filter(audio => {
    const categoryMatch = selectedCategory === 'All' || audio.category === selectedCategory;
    const transcriptionMatch = 
      filterTranscription === 'all' || 
      (filterTranscription === 'with' && audio.hasTranscription) ||
      (filterTranscription === 'without' && !audio.hasTranscription);
    
    return categoryMatch && transcriptionMatch;
  });

  return (
    <div className="audio-library-container">
      <div className="library-header">
        <h1>Audio Lectures Library</h1>
        <p>Browse and listen to spiritual lectures with transcriptions</p>
      </div>

      <div className="filters-container">
        <div className="filter-group">
          <label>Category:</label>
          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="filter-select"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Transcription:</label>
          <select 
            value={filterTranscription} 
            onChange={(e) => setFilterTranscription(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Lectures</option>
            <option value="with">With Transcription</option>
            <option value="without">Without Transcription</option>
          </select>
        </div>
      </div>

      <div className="audio-grid">
        {filteredAudio.map(audio => (
          <div key={audio.id} className="audio-card">
            <div className="audio-icon">🎵</div>
            <div className="audio-content">
              <h3>{audio.title}</h3>
              <div className="audio-meta">
                <span className="category-tag">{audio.category}</span>
                {audio.hasTranscription && (
                  <span className="transcription-badge">📝 Transcription</span>
                )}
              </div>
              <div className="audio-info">
                <span>📅 {audio.date}</span>
                <span>⏱️ {audio.duration}</span>
              </div>
              <Link to={`/audio/${audio.id}`} className="view-button">
                View Details →
              </Link>
            </div>
          </div>
        ))}
      </div>

      {filteredAudio.length === 0 && (
        <div className="no-results">
          <p>No audio lectures found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}

export default AudioLibrary;
