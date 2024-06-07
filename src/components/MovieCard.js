import { imageOrigin } from '../api/moviedb';

export const MovieListCard = ({ item }) => {
  return (
    <div className='flex justify-center items-center h-full mx-1'>
      <a href={`/movie/${item.id}`} className='w-full h-full'>
        <img src={imageOrigin(item.poster_path)} alt={item.title} className='w-full h-full object-cover rounded-lg' />
      </a>
    </div>
  );
};