import React from 'react';

export default function Loading() {
  return (
    <div className='flex items-center justify-center h-80'>
      <div className='w-16 h-16 border-t-4 border-b-7 border-gray-500 rounded-full animate-spin'></div>
    </div>
  )
}