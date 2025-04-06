import React, { useRef } from 'react';
import './vidplayer.css';

const VidPlayer = () => {
  const videoRef = useRef(null);

  const togglePlayPause = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  };

  const changeSpeed = (event) => {
    videoRef.current.playbackRate = event.target.value;
  };

  return (
    <div className="video-container">
      <h1>Custom Video Player</h1>
      <video ref={videoRef} id="videoPlayer" width="600" controls>
        <source src="path_to_your_clipped_video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="controls">
        <button onClick={togglePlayPause}>Play/Pause</button>
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
