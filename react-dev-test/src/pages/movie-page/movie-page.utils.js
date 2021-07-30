import axios from 'axios';
import get from 'lodash/get';

export const getMovieDetail = async (imdbID) => {
  try {
    const url = `http://www.omdbapi.com/?apikey=faf7e5bb&i=${encodeURIComponent(imdbID)}`;
    const result = await axios.get(url);
    const data = get(result, 'data', {});
    
    return data;
  } catch (error) {
    throw error;
  }
};
