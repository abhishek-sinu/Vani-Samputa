import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { videoData } from '../data/libraryData';
import './VideoPlaylist.css';

function VideoPlaylist() {
  const { playlistId } = useParams();
  const playlist = videoData.find(p => p.id === parseInt(playlistId));

  if (!playlist) {
    return (
      <div className="video-playlist-container">
        <div className="error-message">
          <h2>Playlist not found</h2>
          <Link to="/video" className="back-link">← Back to Video Library</Link>
        </div>
      </div>
    );
  }

  // Extract YouTube video ID from URL
  const getYouTubeEmbedUrl = (url) => {
    const videoId = url.split('v=')[1] || 'dQw4w9WgXcQ';
    return `https://www.youtube.com/embed/${videoId}`;
  };

  return (
    <div className="video-playlist-container">
      <Link to="/video" className="back-link">← Back to Video Library</Link>
      
      <div className="playlist-header">
        <div className="playlist-icon">📹</div>
        <div>
          <h1>{playlist.playlistName}</h1>
          <p>{playlist.description}</p>
          <span className="video-count-badge">{playlist.videos.length} Videos</span>
        </div>
      </div>

      <div className="videos-list">
        {playlist.videos.map((video, index) => (
          <div key={video.id} className="video-item">
            <div className="video-number">{index + 1}</div>
            <div className="video-content">
              <h3>{video.title}</h3>
              <p className="video-description">{video.description}</p>
              <div className="video-meta">
                <span>⏱️ {video.duration}</span>
              </div>
              <div className="video-player-container">
                <iframe
                  width="100%"
                  height="400"
                  src={getYouTubeEmbedUrl(video.youtubeUrl)}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="video-iframe"
                ></iframe>
                <a 
                  href={video.youtubeUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="youtube-link"
                >
                  Watch on YouTube →
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VideoPlaylist;
