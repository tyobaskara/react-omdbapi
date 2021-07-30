import React, { useEffect, useState, useCallback } from 'react';

import {
  getMoviesList,
  filterSearchPattern,
  setAutocompleteOptions
} from './form-search.utils';

import './form-search.styles.scss';

const FormSearch = (props) => {
  const [ shouldFetchMovies, setShouldFetchMovies ] = useState(false);
  const [ textInput, setTextInput ] = useState(null);
  const { searchQuery, searchOptions, setMoviesPage, moviesPage } = props;
  
  const textInputRef = useCallback((textInputNode) => {
    setTextInput(textInputNode);
  }, []);

  useEffect(() => {
    const _fetchMovies = async ({ isNextPage }) => {
      const { searchQuery, searchOptions, setMoviesList,
        setIsLoadingSearch, setSearchError, setSearchOptions, 
        moviesPage, moviesList } = props;
      
      setIsLoadingSearch(true);
    
      try {
        const { list, error } = await getMoviesList(searchQuery, moviesPage.index);
    
        if (list.length) {
          if (isNextPage) {
            const concatList = moviesList.concat(list);
            setMoviesList(concatList);
          } else {
            setMoviesList(list);
          }
        } 
        else if (searchOptions.length) {
          console.log('~ list', list);
          const filteredCollections = filterSearchPattern(searchOptions, searchQuery);
          if (filteredCollections.length) {
            setMoviesList(filteredCollections);
          }
        }

        if (error) {
          setMoviesList([]);
          setSearchError(error);
        } else {
          setSearchError('');
        }
    
        setIsLoadingSearch(false);
        setSearchOptions([]);
        textInput.blur();
      } catch (error) {
        setIsLoadingSearch(false);
        setMoviesList([]);
        setSearchError(error);
      }
    };

    if (shouldFetchMovies) {
      _fetchMovies({ isNextPage: false }); 
      setShouldFetchMovies(false);
    }

    if (moviesPage.shouldFetchMovies) {
      _fetchMovies({ isNextPage: true }); 
      setMoviesPage({
        index: moviesPage.index,
        shouldFetchMovies: false
      });
    }
  }, [shouldFetchMovies, textInput, props, moviesPage, setMoviesPage])

  const _onOptionClick = (title) => () => {
    props.setSearchQuery(title);
    setShouldFetchMovies(true);
  };

  const _onChangeInput = (keyword) => {
    const { setSearchQuery, setSearchOptions, searchOptions } = props;
    
    setSearchQuery(keyword);

    if (keyword) {
      setAutocompleteOptions(keyword, searchOptions, (options) => {
        if (options.length) {
          setSearchOptions(options);
        } else {
          setSearchOptions([]);    
        }
      });
    } else {
      setSearchOptions([]);
    }
  };

  const _onSubmit = (event) => {
    event.preventDefault();
    const { searchQuery } = props;
  
    if (searchQuery.trim()) {
      setShouldFetchMovies(true);
    }
  };

  return (
    <div className='form-search'>
      <form 
        onSubmit={event => _onSubmit(event)}
      >
        <div className='form-group'>
          <input 
            autoComplete="off"
            ref={textInputRef}
            id="searchMovies" 
            type="text" 
            name="searchMovies" 
            placeholder="Search Movies.." 
            onChange={({ target: { value } }) => _onChangeInput(value)} 
            value={searchQuery}
          />

          <button type='submit'>
            <i className="fa fa-search"></i>
          </button>
        </div>
      </form>

      <ul className="options">
        {searchOptions.map((option) => {
          const { Title, Year, imdbID } = option;

          return (
            <li 
              key={imdbID}
              onClick={_onOptionClick(Title, props)}
            >{Title} - {Year}</li>
          );
        })}
      </ul>
    </div>
  );
};

export default FormSearch;
