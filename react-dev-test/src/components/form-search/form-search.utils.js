import axios from 'axios';
import get from 'lodash/get';

export const getMoviesList = async (searchQuery, pageNumber) => {
  try {
    const url = `http://www.omdbapi.com/?apikey=faf7e5bb&s=${encodeURIComponent(searchQuery)}&page=${pageNumber}`;
    const result = await axios.get(url);
    const list = get(result, 'data.Search', []);
    const error = get(result, 'data.Error', '');
    
    return { list, error };
  } catch (error) {
    throw error;
  }
};

export const filterSearchPattern = (options, keyword) => {
  const searchPattern = new RegExp('^' + keyword , 'i');
  const result = options.filter(option => 
    searchPattern.test(option.Title));

  return result;
};

export const setAutocompleteOptions = async (keyword, currentOptions, callback) => {
  try {
    const { list } = await getMoviesList(keyword);

    if (list.length) {
      const filteredOptions = filterSearchPattern(list, keyword);
      
      return callback(filteredOptions);
    } else if (currentOptions.length) {
      const filteredOptions = filterSearchPattern(currentOptions, keyword);

      return callback(filteredOptions);
    }
  } catch (error) {
    return callback([], error);
  }
}