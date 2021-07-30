import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'
import App from './App';

import { INITIAL_STATE as moviesState } from './redux/movies/movies.reducer';

const middlewares = [];
const mockStore = configureStore(middlewares);
const initialState = {
  movies: moviesState
};
const store = mockStore(initialState)

const observe = jest.fn();
const unobserve = jest.fn();

// you can also pass the mock implementation
// to jest.fn as an argument
window.IntersectionObserver = jest.fn(() => ({
  observe,
  unobserve,
}))

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render((
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  ), div);
  ReactDOM.unmountComponentAtNode(div);
});
