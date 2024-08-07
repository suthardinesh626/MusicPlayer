import React, { useEffect, useState } from 'react';
import Logo from '../assets/Vector.png';
import SongList from '../components/SongList';
import SongCard from '../components/SongCard';
import { useSongContext } from '../context/SongContext';
import SearchBar from '../components/SearchBar';
import ColorThief from 'colorthief';
import Profile from '../assets/Profile.png';

const Home = () => {
  const { song } = useSongContext();

  const [currentIndex, setCurrentIndex] = useState(null);
  const [backgroundGradient, setBackgroundGradient] = useState('linear-gradient(to bottom, black, white)');
  const [activeTab, setActiveTab] = useState('For You'); // State to manage active tab

  const BASE_IMAGE_URL = 'https://cms.samespace.com/assets/';

  const extractColor = (coverId) => {
    const coverUrl = `${BASE_IMAGE_URL}${coverId}`;
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = coverUrl;
    img.onload = () => {
      const colorThief = new ColorThief();
      const dominantColor = colorThief.getColor(img);
      const [r, g, b] = dominantColor;
      const gradient = `linear-gradient(to bottom, rgb(${r},${g},${b}), rgb(${r + 50},${g + 50},${b + 50}))`;
      setBackgroundGradient(gradient);
    };
  };

  const playSong = (selectedSongData, index) => {
    setCurrentIndex(index);
    extractColor(selectedSongData.cover);
  };

  const handleNext = () => {
    const newIndex = (currentIndex + 1) % song.length;
    setCurrentIndex(newIndex);
    extractColor(song[newIndex]?.cover);
  };

  const handlePrevious = () => {
    const newIndex = (currentIndex - 1 + song.length) % song.length;
    setCurrentIndex(newIndex);
    extractColor(song[newIndex]?.cover);
  };

  return (
    <div className='w-full h-full lg:h-screen flex flex-col lg:flex-row justify-evenly items-center font-inter' style={{ background: backgroundGradient }}>
      <div className='h-full flex flex-row lg:flex-col justify-evenly items-center lg:justify-between m-2 p-8'>
        <img className='m-5' src={Logo} alt="Spotofy_logo" />
        <img className='w-10 h-10' src={Profile} alt="" />
      </div>
      <div className='w-full lg:w-1/3 flex flex-col order-last lg:order-none'>
        <div className='flex flex-row justify-evenly'>
          {/* Toggle active tab color */}
          <p
            className={`font-inter font-extrabold text-2xl cursor-pointer ${activeTab === 'For You' ? 'text-white' : 'text-backgound'}`}
            onClick={() => setActiveTab('For You')}
          >
            For You
          </p>
          <p
            className={`font-inter font-extrabold text-2xl cursor-pointer ${activeTab === 'Top Track' ? 'text-white' : 'text-backgound'}`}
            onClick={() => setActiveTab('Top Track')}
          >
            Top Track
          </p>
        </div>
        <div className='m-3 gap-1'>
          <SearchBar placeholder="Song, artist..." />
          <div className='flex flex-col overflow-y-auto' style={{ maxHeight: 'calc(100vh - 200px)' }}>
            {song.map((songData, index) => (
              <SongList key={songData.id} {...songData} onClick={() => playSong(songData, index)} />
            ))}
          </div>
        </div>
      </div>
      <div className='w-full lg:w-3/5 p-5 justify-center items-center'>
        {currentIndex !== null && (
          <SongCard
            url={song[currentIndex]?.url}
            cover={song[currentIndex]?.cover}
            name={song[currentIndex]?.name}
            handleNext={handleNext}
            handlePrevious={handlePrevious}
            artist={song[currentIndex]?.artist}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
