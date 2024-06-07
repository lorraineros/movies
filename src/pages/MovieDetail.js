import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieCredits, fetchMovieDetails, fetchMovieVideos, fetchSimilarMovies, imageOrigin } from '../api/moviedb';
import MovieList from '../components/MovieList';
import Loading from '../components/Loading';

export default function MovieDetailPage() {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [cast, setCast] = useState([]);
  const [director, setDirector] = useState([]);
  const [similar, setSimilar] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [trailer, setTrailer] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMovieDetails(id);
    getMovieCredits(id);
    getMovieVideos(id);
    getSimilarMovies(id);
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setIsFavorite(favorites.some(movie => movie.id === parseInt(id)));
  }, [id]);

  const getMovieDetails = async id => {
    const data = await fetchMovieDetails(id);
    if (data) setMovie(data);
    setLoading(false);
  };

  const getMovieCredits = async id => {
    const data = await fetchMovieCredits(id);
    if (data && data.cast) setCast(data.cast);
    if (data && data.crew) setDirector(data.crew);
    setLoading(false);
  };

  const getMovieVideos = async id => {
    const data = await fetchMovieVideos(id);
    if (data && data.results) {
      const trailer = data.results.find(video => video.site === 'YouTube' && video.type === 'Trailer' && video.official);
      if (trailer) {
        const trailerUrl = `https://www.youtube.com/embed/${trailer.key}`;
        setTrailer(trailerUrl);
        localStorage.setItem(`trailer-${id}`, trailerUrl);
      }
    }
    setLoading(false);
  }

  const getSimilarMovies = async id => {
    const data = await fetchSimilarMovies(id);
    if (data && data.results) setSimilar(data.results);
    setLoading(false);
  };

  const toggleFavorite = () => {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const isAlreadyFavorite = favorites.some(movie => movie.id === parseInt(id));

    if (isAlreadyFavorite) {
      favorites = favorites.filter(movie => movie.id !== parseInt(id));
      localStorage.setItem('favorites', JSON.stringify(favorites));
    } else {
      if (movie) {
        favorites.push(movie);
        localStorage.setItem('favorites', JSON.stringify(favorites));
      }
    }

    setIsFavorite(!isAlreadyFavorite);
  };

  if (!movie) {
    return <div className='text-center p-10'>Loading...</div>;
  }

  return (
    <div className='max-w-6xl mx-auto mt-8'>
      { loading ? 
        <Loading /> : 
        <>
          <div className='flex flex-col md:flex-row'>
            <div className='md:w-1/3 md:pr-8 max-[768px]:flex max-[768px]:justify-center max-[768px]:items-center'>
              <img
                src={imageOrigin(movie?.poster_path)}
                alt={movie?.title}
                className='rounded-lg w-full mb-5 md:w-auto max-[768px]:h-96 max-[768px]:w-auto'
              />
            </div>
            <div className='md:w-2/3'>
              <h1 className='text-3xl font-bold'>{movie?.title}</h1>
              <p className='text-gray-500'>{movie?.status} • {movie?.release_date} • {movie?.runtime} min</p>
              {movie && movie?.genres && (
                <div className='flex space-x-2'>
                  {movie?.genres.map((genre, index) => {
                    let showDot = index + 1 !== movie?.genres.length;
                    return <p key={index} className='text-gray-500 text-base text-center'>{genre.name} {showDot ? '•' : null} </p>;
                  })}
                </div>)}
              <div className='flex flex-wrap'>
                <p className='text-gray-500'>Cast: </p>
                {cast && cast.map((person, index) => {
                  let showComma = index + 1 !== 3;
                  if (index < 3) {
                    return (
                      <p key={index} className='text-gray-500 text-base text-center ml-2'>
                         {person?.original_name}{showComma ? ',' : null}
                      </p>
                    );
                  }
                  return null;
                })}
              </div>
              <div className='flex space-x-2'>
                <p className='text-gray-500'>Director: </p>
                {director && director.filter(person => person.job === 'Director').map((person, index, array) => {
                  let showComma = array.length > 1 && index < array.length - 1;
                  return (
                    <p key={index} className='text-gray-500 text-base text-center'>
                      {person?.original_name}{showComma ? ',' : null}
                    </p>
                  );
                }
                )}
              </div>
              <p className='mt-4'>{movie?.overview}</p>
              { trailer.length > 0 ? 
                <div className='mt-5'>
                  {trailer && (
                    <iframe
                      title='movie-trailer'
                      src={trailer}
                      allowFullScreen
                      frameBorder='0' />
                  )}
                </div> 
                : <></> }
            </div>
          </div>
          <div className='mt-4'>
            <button
              className='flex items-center justify-center rounded-lg pb-5'
              onClick={toggleFavorite}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                className='w-8 h-8 fill-current'
              >
                {isFavorite ? (
                  <path
                    fill='currentColor'
                    d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'
                  />
                ) : (
                  <path
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    fill='none'
                    d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'
                  />
                )}
              </svg>
              <p className='ml-3'>{isFavorite ? 'Remove from favorite' : 'Add to favorite'}</p>
            </button>
          </div>
          {similar.length > 0 && <MovieList title='Similar Movies' data={similar} />}
        </>
      }
    </div>
  );
}
