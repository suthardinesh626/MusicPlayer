import React from 'react';
import Search from '../assets/search.png';

const SearchBar = ({ placeholder }) => {
  return (
    <div className='relative flex justify-center items-center text-white border border-white-100 rounded-lg'>
      <input
        className='rounded-md p-2 w-full opacity-70 bg-transparent appearance-none border-none  '
        type='text'
        placeholder={placeholder}
      />
      <img
        className='h-5 w-5 absolute right-2 '
        src={Search}
        alt="Search Icon"
      />
    </div>
  );
};

export default SearchBar;
