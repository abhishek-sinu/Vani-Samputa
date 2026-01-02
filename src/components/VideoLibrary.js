import React from 'react';
import { Link } from 'react-router-dom';
import { videoData } from '../data/libraryData';
import './VideoLibrary.css';

function VideoLibrary() {
  return (
    <div className="video-library-container">
      <div className="library-header">
        <h1>Video Playlists</h1>
        <p>Watch organized video lecture series on various topics</p>
      </div>

      <div className="playlists-grid">
        {videoData.map(playlist => (
          <div key={playlist.id} className="playlist-card">
            <div className="playlist-thumbnail">
              <div className="thumbnail-overlay">
                <span className="video-count">{playlist.videos.length} Videos</span>
              </div>
              📹
            </div>
            <div className="playlist-content">
              <h3>{playlist.playlistName}</h3>
              <p className="playlist-description">{playlist.description}</p>
              <Link to={`/video/${playlist.id}`} className="view-playlist-button">
                View Playlist →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VideoLibrary;
