import React from 'react';
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
      </header>
    );
  }
}

export default Header;
