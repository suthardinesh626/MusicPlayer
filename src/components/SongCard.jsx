import React, { useRef, useState, useEffect } from 'react';
import Pause from '../assets/pause.png';
import Play from '../assets/play.png';
import Next from '../assets/next.png';
import Previous from '../assets/previous.png';
import Option from '../assets/Frame.png';
import Sound from '../assets/sound.png';
import Mute from '../assets/mute.png'; // Add an icon for mute

const SongCard = ({ url, cover, artist, name, handleNext, handlePrevious }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false); // State to manage mute status
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);
  const progressBarRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;

    const updateCurrentTime = () => {
      setCurrentTime(audio.currentTime);
    };

    const setAudioData = () => {
      setDuration(audio.duration);
    };

    audio.addEventListener('timeupdate', updateCurrentTime);
    audio.addEventListener('loadedmetadata', setAudioData);

    return () => {
      audio.removeEventListener('timeupdate', updateCurrentTime);
      audio.removeEventListener('loadedmetadata', setAudioData);
    };
  }, []);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [url]);

  const handlePlay = () => {
    setIsPlaying(true);
    audioRef.current.play();
  };

  const handlePause = () => {
    setIsPlaying(false);
    audioRef.current.pause();
  };

  const handleProgressClick = (e) => {
    const progressBar = progressBarRef.current;
    const rect = progressBar.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const newTime = (offsetX / progressBar.offsetWidth) * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
    audioRef.current.muted = !isMuted;
  };

  return (
    <div className='w-full flex flex-col justify-center items-center text-white'>
      <h1 className='text-white font-extrabold text-2xl font-inter'>{name}</h1>
      <h3 className='text-white font-normal text-sm font-inter'>{artist}</h3>
      <div className='flex flex-col justify-center mt-4 px-4'>
        <img className='rounded-lg w-80 h-80' src={`https://cms.samespace.com/assets/${cover}`} alt="Cover" />
        <audio ref={audioRef} src={url} />
        <div
          ref={progressBarRef}
          className='relative w-full h-1 bg-gray-700 cursor-pointer mt-4 rounded-sm'
          onClick={handleProgressClick}
        >
          <div
            className='absolute top-0 left-0 h-1 bg-white rounded-sm'
            style={{ width: `${(currentTime / duration) * 100}%` }}
          ></div>
        </div>
        <div className='text-gray-400 text-sm mt-2'>
          {Math.floor(currentTime / 60)}:{('0' + Math.floor(currentTime % 60)).slice(-2)} / {Math.floor(duration / 60)}:{('0' + Math.floor(duration % 60)).slice(-2)}
        </div>
        <div className='flex flex-row justify-evenly items-center mt-4'>
          <button className='bg-backgound rounded-full p-2'><img className='w-6 h-6 p-1' src={Option} alt="" /></button>
          <button onClick={handlePrevious} className='w-7 h-7 p-1 rounded-full'><img src={Previous} alt="" /></button>
          <button onClick={isPlaying ? handlePause : handlePlay} className='p-3 bg-white text-black rounded-full'>
            {isPlaying ? <img className='w-8 h-8' src={Pause} alt="pause" /> : <img className='w-8 h-8' src={Play} alt="play" />}
          </button>
          <button onClick={handleNext} className='w-7 h-7 p-1 rounded-full'><img src={Next} alt="" /></button>
          <button onClick={handleMuteToggle} className='bg-backgound rounded-full p-2'>
            <img className='w-6 h-6 p-1' src={isMuted ? Mute : Sound} alt="mute" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SongCard;
