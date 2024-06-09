import axios from 'axios';

const apiBaseUrl = 'https://api.themoviedb.org/3';
const apiKey = 'e5243b4b38c6e098b6709c687a766066';
const trendingMovies = `${apiBaseUrl}/trending/movie/day?api_key=${apiKey}`;
const upcomingMovies = `${apiBaseUrl}/movie/upcoming?api_key=${apiKey}`;
const topRatedMovies = `${apiBaseUrl}/movie/top_rated?api_key=${apiKey}`;
const searchMoviesEndpoint = `${apiBaseUrl}/search/movie?api_key=${apiKey}`;

const movieDetails = id => `${apiBaseUrl}/movie/${id}?api_key=${apiKey}`;
const movieCredits = id => `${apiBaseUrl}/movie/${id}/credits?api_key=${apiKey}`;
const movieVideos = id => `${apiBaseUrl}/movie/${id}/videos?api_key=${apiKey}`;
const similarMovies = id => `${apiBaseUrl}/movie/${id}/similar?api_key=${apiKey}`;

export const imageOrigin = path => path ? `https://image.tmdb.org/t/p/w500/${path}`: null;

const apiCall = async (endpoint, params) => {
  const options = {
    method: 'GET',
    url: endpoint,
    params: params ? params: {}
  }
  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.log('error', error);
    return {}
  }
}

export const fetchTrendingMovies = () => {
  return apiCall(trendingMovies);
}

export const fetchUpcomingMovies = () => {
  return apiCall(upcomingMovies);
}

export const fetchTopRatedMovies = () => {
  return apiCall(topRatedMovies);
}

export const fetchMovieDetails = id => {
  return apiCall(movieDetails(id));
}

export const fetchMovieCredits = id => {
  return apiCall(movieCredits(id));
}

export const fetchMovieVideos = id => {
  return apiCall(movieVideos(id));
}

export const fetchSimilarMovies = id => {
  return apiCall(similarMovies(id));
}

export const searchMovies = params => {
  return apiCall(searchMoviesEndpoint, params);
}