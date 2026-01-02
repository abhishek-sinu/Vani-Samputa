import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { audioData } from '../data/libraryData';
import './AudioDetail.css';

function AudioDetail() {
  const { id } = useParams();
  const audio = audioData.find(a => a.id === parseInt(id));

  if (!audio) {
    return (
      <div className="audio-detail-container">
        <div className="error-message">
          <h2>Audio not found</h2>
          <Link to="/audio" className="back-link">← Back to Audio Library</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="audio-detail-container">
      <Link to="/audio" className="back-link">← Back to Audio Library</Link>
      
      <div className="audio-detail-card">
        <div className="audio-header">
          <div className="audio-icon-large">🎵</div>
          <div className="audio-title-section">
            <h1>{audio.title}</h1>
            <div className="audio-meta-detail">
              <span className="category-tag">{audio.category}</span>
              {audio.hasTranscription && (
                <span className="transcription-badge">📝 Has Transcription</span>
              )}
            </div>
          </div>
        </div>

        <div className="audio-info-section">
          <div className="info-item">
            <strong>Date:</strong> {audio.date}
          </div>
          <div className="info-item">
            <strong>Duration:</strong> {audio.duration}
          </div>
        </div>

        <div className="audio-player-section">
          <h2>Audio Player</h2>
          <audio controls className="audio-player">
            <source src={audio.audioUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
          <p className="audio-note">
            Note: This is a placeholder audio player. Replace the audio URL with actual audio files.
          </p>
        </div>

        {audio.hasTranscription && (
          <div className="transcription-section">
            <h2>Transcription</h2>
            <div className="transcription-content">
              {audio.transcription.split('\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        )}

        {!audio.hasTranscription && (
          <div className="no-transcription">
            <p>Transcription is not available for this lecture yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AudioDetail;
