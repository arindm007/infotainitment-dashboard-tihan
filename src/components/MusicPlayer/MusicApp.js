import React, { useEffect, useState } from "react";
import useSound from "use-sound"; // For sound handling
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai"; // Play/Pause icons
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi"; // Skip icons
import { IconContext } from "react-icons";

import "./MusicApp.css"; // Import your styles

function MusicApp() {
  const CornfieldChase = `${process.env.PUBLIC_URL}/CornfieldChase.mp3`;
  const [isPlaying, setIsPlaying] = useState(false);
  const [time, setTime] = useState({ min: "0", sec: "0" });
  const [currTime, setCurrTime] = useState({ min: "0", sec: "0" });
  const [seconds, setSeconds] = useState(0);

  const [play, { pause, duration, sound }] = useSound(CornfieldChase);

  useEffect(() => {
    if (duration) {
      const sec = duration / 1000;
      const min = Math.floor(sec / 60);
      const secRemain = Math.floor(sec % 60);
      setTime({ min, sec: secRemain });
    }
  }, [duration]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (sound) {
        const currentSeconds = sound.seek([]) || 0;
        const min = Math.floor(currentSeconds / 60);
        const sec = Math.floor(currentSeconds % 60);
        setCurrTime({ min, sec });
        setSeconds(currentSeconds);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [sound]);

  const togglePlayPause = () => {
    if (isPlaying) {
      pause();
      setIsPlaying(false);
    } else {
      play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="music-app">
      <h2 className="track-title">Cornfield Chase</h2>
      <img
        className="album-cover"
        src="https://picsum.photos/id/112/300/300"
        alt="Album Cover"
      />
      <div className="track-info">
        <h3 className="track-name">Interstellar</h3>
        <p className="artist-name">Hans Zimmer</p>
      </div>
      <div className="progress-bar">
        <span className="time-display">{`${currTime.min}:${currTime.sec}`}</span>
        <input
          type="range"
          min="0"
          max={duration / 1000 || 0}
          value={seconds}
          className="timeline"
          onChange={(e) => sound.seek(e.target.value)}
        />
        <span className="time-display">{`${time.min}:${time.sec}`}</span>
      </div>
      <div className="controls">
        <IconContext.Provider value={{ size: "3em", color: "#fff" }}>
          <button className="control-btn">
            <BiSkipPrevious />
          </button>
          <button className="control-btn" onClick={togglePlayPause}>
            {isPlaying ? <AiFillPauseCircle /> : <AiFillPlayCircle />}
          </button>
          <button className="control-btn">
            <BiSkipNext />
          </button>
        </IconContext.Provider>
      </div>
    </div>
  );
}

export default MusicApp;
