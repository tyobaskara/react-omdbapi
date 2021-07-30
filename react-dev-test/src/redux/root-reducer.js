import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import moviesReducer from './movies/movies.reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: []
};

const rootReducer = combineReducers({
  movies: moviesReducer
});

export default persistReducer(persistConfig, rootReducer);
