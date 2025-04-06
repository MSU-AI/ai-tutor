import React, { useRef, useEffect, useState } from 'react';
import './vidplayer.css';

const VidPlayer = ({ videoUrl }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (videoRef.current && videoUrl) {
      videoRef.current.load();  // Reload video if the URL changes
    }
  }, [videoUrl]);

  const togglePlayPause = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const changeSpeed = (event) => {
    videoRef.current.playbackRate = event.target.value;
  };

  return (
    <div className="video-container">
      <h1>Custom Video Player</h1>
      {/* If videoUrl is present, render video player, else show a placeholder message */}
      {videoUrl ? (
        <video ref={videoRef} id="videoPlayer" width="600" controls>
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <p>No video available to display.</p>
      )}
      
      <div className="controls">
        <button onClick={togglePlayPause}>
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <label htmlFor="speedControl">Speed:</label>
        <select id="speedControl" onChange={changeSpeed} defaultValue="1">
          <option value="0.5">0.5x</option>
          <option value="1">1x</option>
          <option value="1.5">1.5x</option>
          <option value="2">2x</option>
        </select>
      </div>
    </div>
  );
};

export default VidPlayer;
