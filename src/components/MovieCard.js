import React, { useState } from 'react';
import { imageOrigin } from '../api/moviedb';
import notFound from '../assets/not-found.jpg';

export const MovieCard = ({ item }) => {
  const [showTitle, setShowTitle] = useState(false);

  const handleMouseEnter = () => {
    setShowTitle(true);
  };

  const handleMouseLeave = () => {
    setShowTitle(false);
  };

  return (
    <div className='flex justify-center items-center h-full mx-1'>
      <a href={`/movie/${item.id}`} className='w-full h-full'>
        <div
          className='relative w-full h-full'
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {item.poster_path ? (
            <img
              src={imageOrigin(item.poster_path)}
              alt={item.title}
              className='w-full h-full object-cover rounded-lg'
            />
          ) : (
            <img
              src={notFound}
              alt={item.title}
              className='w-full h-full object-cover rounded-lg'
            />
          )}
          <p className={`absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white p-2 text-center transition-opacity duration-300 ${ showTitle ? 'opacity-100' : 'opacity-0'}`}>
            {item.title}
          </p>
        </div>
      </a>
    </div>
  );
};
