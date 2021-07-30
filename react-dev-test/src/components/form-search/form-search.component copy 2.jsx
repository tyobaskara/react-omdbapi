import React, { useEffect, useState, useCallback } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { 
  selectSearchQuery,
  selectSearchOptions
} from '../../redux/movies/movies.selectors';

import { 
  setSearchQuery, 
  setSearchOptions,
  setMoviesList,
  setIsLoadingSearch,
  setIsSearchError
} from '../../redux/movies/movies.actions';

import useFetchMovies from '../../hooks/useFetchMovies';

import {
  setAutocompleteOptions
} from './form-search.utils';

import './form-search.styles.scss';

const FormSearch = (props) => {
  const [ textInput, setTextInput ] = useState(null);
  const [ pageNumber, setPageNumber ] = useState(1);
  const { searchQuery, searchOptions } = props;
  const { loading, error, list } = useFetchMovies(searchQuery, pageNumber, searchOptions);
  
  useEffect(() => {
    const { setMoviesList, setSearchOptions } = props;

    if (list.length) {
      console.log('~~ list', list);
      setMoviesList(list);
      setSearchOptions([]);
      // textInput.blur();
    }

    if (loading) {
      setIsLoadingSearch(true);
    }

    if (error) {
      setIsSearchError(error)
    }
  }, [list, textInput, props, loading, error]);

  const textInputRef = useCallback((textInputNode) => {
    setTextInput(textInputNode);
  }, []);

  const _onOptionClick = (title) => () => {
    props.setSearchQuery(title);
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
    setSearchQuery(searchQuery);
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

const mapStateToProps = createStructuredSelector({
  searchQuery: selectSearchQuery,
  searchOptions: selectSearchOptions
});

const mapDispatchToProps = dispatch => ({
  setSearchQuery: (value) => dispatch(setSearchQuery(value)),
  setSearchOptions: (value) => dispatch(setSearchOptions(value)),
  setMoviesList: (value) => dispatch(setMoviesList(value)),
  setIsLoadingSearch: (value) => dispatch(setIsLoadingSearch(value)),
  setIsSearchError: (value) => dispatch(setIsSearchError(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(FormSearch);
