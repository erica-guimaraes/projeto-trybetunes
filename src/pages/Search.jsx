import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  state = {
    artistName: '',
    btnDisabled: true,
  };

  onInputChange = ({ target }) => {
    const { name, value } = target;
    const tamMinino = 2;
    this.setState({
      [name]: value,
      btnDisabled: value.length < tamMinino,
    });
  };

  render() {
    const { artistName, btnDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            data-testid="search-artist-input"
            type="text"
            name="artistName"
            onChange={ this.onInputChange }
            value={ artistName }
          />
          <button
            data-testid="search-artist-button"
            disabled={ btnDisabled }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
