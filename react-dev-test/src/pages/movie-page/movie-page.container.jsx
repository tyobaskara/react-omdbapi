import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import MoviePage from './movie-page.component';

const MoviePageComponent = props => (<MoviePage {...props}/>);

const mapStateToProps = (state, ownProps) => ({
  imdbID: ownProps.match.params.imdbID
});

const enhance = compose(
  withRouter,
  connect(mapStateToProps)
);

export default enhance(MoviePageComponent);
