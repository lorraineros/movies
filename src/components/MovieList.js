import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { CustomLeftArrow, CustomRightArrow } from './Buttons';
import { MovieCard } from './MovieCard';

export default function MovieList({ title, data }) {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      height: 400,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
      height: 300,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
      height: 200,
      swipeable: true,
    },
  };

  return (
    <div className='max-w-6xl mx-auto my-5 relative'>
      <h1 className='text-xl mb-5'>{title}</h1>
      <Carousel
        responsive={responsive}
        infinite={true}
        centerMode={true}
        containerClass='carousel-container'
        itemClass='carousel-item'
        customLeftArrow={<CustomLeftArrow />}
        customRightArrow={<CustomRightArrow />}
      >
        {data.map((item, index) => (
          <MovieCard key={index} item={item} />
        ))}
      </Carousel>
    </div>
  );
}
