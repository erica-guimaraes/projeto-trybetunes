import React from 'react';
import { Link } from 'react-router-dom';
import Carregando from './Carregando';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  state = {
    nameUser: '',
    loading: true,
  };

  async componentDidMount() {
    const { name } = await getUser();
    this.setState({
      loading: false,
      nameUser: name,
    });
  }

  render() {
    const { nameUser, loading } = this.state;
    return (
      <header data-testid="header-component">
        {loading ? <Carregando />
          : (<p data-testid="header-user-name">{nameUser}</p>)}
        <nav>
          <Link to="/search" data-testid="link-to-search">Search</Link>
          <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
          <Link to="/profile" data-testid="link-to-profile">Profile</Link>
        </nav>

      </header>
    );
  }
}

export default Header;
