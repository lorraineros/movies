import React from 'react';

export default function Navbar() {
  return (
    <div className='container mx-auto flex justify-between items-center max-w-full md:max-w-6xl'>
      <div className='text-center flex-1 flex items-center justify-center'>
        <a href='/' className='flex items-center'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 512 512'
            className='w-6 h-6 mr-2 mt-1'
          >
            <path
              fill='#ffffff'
              d='M448 32H361.9l-1 1-127 127h92.1l1-1L453.8 32.3c-1.9-.2-3.8-.3-5.8-.3zm64 128V96c0-15.1-5.3-29.1-14-40l-104 104H512zM294.1 32H201.9l-1 1L73.9 160h92.1l1-1 127-127zM64 32C28.7 32 0 60.7 0 96v64H6.1l1-1 127-127H64zM512 192H0V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V192z'
            />
          </svg>
          <span className='text-3xl font-bold mb-0 text-white'>Movies</span>
        </a>
      </div>
      <div className='inline-block'>
        <a href='/search'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 512 512'
            className='w-6 h-6 text-white'
          >
            <path
              fill='currentColor'
              d='M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z'
            />
          </svg>
        </a>
      </div>
    </div>
  );
}
