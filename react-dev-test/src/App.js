import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import './App.scss';

import BrowsePage from './pages/browse-page/browse-page.component';

import Header from './components/header/header.component';

class App extends React.Component {
  render() {
    return (
      <div className='wrapper'>
        <Header />
        <Switch>
          <Route exact path='/' render={() => <Redirect to='/browse'/>} />
          <Route path='/browse' component={BrowsePage} />
        </Switch>
      </div>
    );
  }
}

export default App;
