import React, { useEffect, useState } from 'react';
import { fetchTopRatedMovies, fetchTrendingMovies, fetchUpcomingMovies } from '../api/moviedb';
import TrendingMovies from '../components/TrendingMovies';
import MovieList from '../components/MovieList';
import Loading from '../components/Loading';

export default function Home() {
  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTrendingMovies();
    getUpcomingMovies();
    getTopRatedMovies();
    getFavorites();
  }, [favorites]);

  const getTrendingMovies = async () => {
    try {
      const data = await fetchTrendingMovies();
      if (data && data.results) setTrending(data.results);
    } catch (error) {
      console.error('Error fetching trending movies:', error);
    }
    setLoading(false);
  };

  const getUpcomingMovies = async () => {
    try {
      const data = await fetchUpcomingMovies();
      if (data && data.results) setUpcoming(data.results);
    } catch (error) {
      console.error('Error fetching upcoming movies:', error);
    }
    setLoading(false);
  };

  const getTopRatedMovies = async () => {
    try {
      const data = await fetchTopRatedMovies();
      if (data && data.results) setTopRated(data.results);
    } catch (error) {
      console.error('Error fetching top-rated movies:', error);
    }
    setLoading(false);
  };


  const getFavorites = () => {
    const data = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(data);
  };

  return (
    <div className='mt-5'>
      {loading ? (
        <Loading />
      ) : (
        <>
          {trending.length > 0 && <TrendingMovies data={trending} />}
          {upcoming.length > 0 && <MovieList title='Upcoming' data={upcoming} />}
          {topRated.length > 0 && <MovieList title='Top Rated' data={topRated} />}
          {favorites.length > 0 
            ? <MovieList title='Favorites' data={favorites} /> 
            : <div className='max-w-6xl mx-auto my-5 relative p-4'>
                <h1 className='text-xl mb-5'>Favorites</h1>
                <p className='text-center'>No favorites added yet</p>
              </div>}
        </>
      )}
    </div>
  );
}
