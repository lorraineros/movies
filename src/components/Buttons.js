export const CustomLeftArrow = ({ onClick }) => {
  return (
    <button
      className='absolute left-1 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-black bg-opacity-45 text-white text-3xl rounded-lg shadow-md hover:bg-opacity-70'
      onClick={onClick}
    >
      &#10094;
    </button>
  );
};

export const CustomRightArrow = ({ onClick }) => {
  return (
    <button
      className='absolute right-1 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-black bg-opacity-45 text-white text-3xl rounded-lg shadow-md hover:bg-opacity-70'
      onClick={onClick}
    >
      &#10095;
    </button>
  );
};