import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { imageOrigin } from '../api/moviedb';
import { Link } from 'react-router-dom';
import { CustomLeftArrow, CustomRightArrow } from './Buttons';
import Loading from './Loading';

export default function TrendingMovies({ data }) {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    },
  };

  return (
    <div className='max-w-6xl mx-auto'>
      <h1 className='text-xl mb-5'>Trending</h1>
      { data.length === 0
      ? <Loading />
      : <Carousel
          responsive={responsive}
          infinite={true}
          autoPlay={true}
          centerMode={true}
          autoPlaySpeed={5000}
          containerClass='carousel-container'
          itemClass='carousel-item'
          customLeftArrow={<CustomLeftArrow />}
          customRightArrow={<CustomRightArrow />}
        >
          {data.map((item, index) => (
            <MovieCard key={index} item={item} />
          ))}
        </Carousel>}
    </div>
  );
}

const MovieCard = ({ item }) => {
  return (
    <div className='flex justify-center items-center custom-slide h-full mx-2'>
      <Link to={`/movie/${item.id}`} className='w-full h-full'>
        <img src={imageOrigin(item.poster_path)} alt={item.title} className='w-full h-auto object-cover rounded-lg' />
      </Link>
    </div>
  );
};

