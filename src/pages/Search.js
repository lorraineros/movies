import React, { useState } from 'react';
import { imageOrigin, searchMovies } from '../api/moviedb';
import Loading from '../components/Loading';

export default function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchExecuted, setSearchExecuted] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchExecuted(true);
    if (query && query.length > 0) {
      setLoading(true);
      searchMovies({
        query: query,
        include_adult: 'false',
        language: 'en-US',
        page: '1'
      }).then(data => {
        setLoading(false);
        if (data && data.results) setResults(data.results);
      });
    } else {
      setLoading(false);
      setResults([]);
    }
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className='p-4'>
      <form onSubmit={handleSearch} className='relative w-full max-w-md mx-auto mt-8'>
        <input
          type='text'
          value={query}
          onChange={handleChange}
          placeholder='Search'
          className='p-2 pl-4 pr-10 border rounded w-full'
        />
        <button
          type='submit'
          className='absolute right-0 top-0 mt-2 mr-2'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 512 512'
            className='w-6 h-6 text-gray-600'
          >
            <path
              fill='currentColor'
              d='M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z'
            />
          </svg>
        </button>
      </form>
      {loading ? (
        <Loading />
      ) : (
        results.length > 0 ? (
          <div>
            <p className='my-5'>Results({results.length})</p>
            <div className='grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
              {results.map((movie) => (
                <a href={`/movie/${movie.id}`} key={movie.id}>
                  <img
                    src={imageOrigin(movie.poster_path)}
                    alt={movie.title}
                    className='rounded-lg w-full h-auto'
                  />
                  <p className='mt-2 overflow-hidden text-ellipsis whitespace-nowrap'>
                    {movie.title}
                  </p>
                </a>
              ))}
            </div>
          </div>
        ) : (
          <><div className='flex justify-center items-center m-10'>
            <svg 
              xmlns='http://www.w3.org/2000/svg' 
              viewBox='0 0 512 512'
              className='w-48 h-auto'
            >
              <path 
                fill='#ffffff' 
                d='M448 32H361.9l-1 1-127 127h92.1l1-1L453.8 32.3c-1.9-.2-3.8-.3-5.8-.3zm64 128V96c0-15.1-5.3-29.1-14-40l-104 104H512zM294.1 32H201.9l-1 1L73.9 160h92.1l1-1 127-127zM64 32C28.7 32 0 60.7 0 96v64H6.1l1-1 127-127H64zM512 192H0V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V192z'/>
            </svg>
          </div>
          {searchExecuted ? <div className='text-xl text-center my-10'>No results found</div> : <div className='text-xl text-center my-10'>Search for a movie...</div>}
          </>
        )
      )}
    </div>
  );
}
