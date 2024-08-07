import React from 'react';

const SongList = ({ artist, cover, name, onClick }) => {
  return (
    <div
      className='m-2 flex flex-row cursor-pointer gap-4 relative'
      onClick={onClick} 
    >
      <img
        className='text-gray-200 w-10 h-10 rounded-3xl m-2'
        src={`https://cms.samespace.com/assets/${cover}`}
        alt="Cover Image"
      />
      <div className='flex flex-col justify-center'>
        <h1 className='text-white text-xl font-normal font-inter'>{name}</h1>
        <h4 className='text-white font-inter'>{artist}</h4>
      </div>
      
    </div>
  );
};

export default SongList;
