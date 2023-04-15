import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages.js/Login';
import Search from './pages.js/Search';
import Album from './pages.js/Album';
import Favorites from './pages.js/Favorites';
import Profile from './pages.js/Profile';
import ProfileEdit from './pages.js/ProfileEdit';
import NotFound from './pages.js/NotFound';

class App extends React.Component {
  render() {
    return (
      <div>
        TrybeTunes
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/search" component={ Search } />
          <Route path="/album" component={ Album } />
          <Route path="/favorites" component={ Favorites } />
          <Route path="/profile" component={ Profile } />
          <Route path="/profile/edit" component={ ProfileEdit } />
          <Route path="" component={ NotFound } />

        </Switch>

      </div>
    );
  }
}

export default App;
