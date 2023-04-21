import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Carregando from '../components/Carregando';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  state = {
    artistName: '',
    btnDisabled: true,
    loading: false,
    searchArtist: '',
    albums: '',
  };

  valideBtn = () => {
    const { searchArtist } = this.state;
    const valide = searchArtist.length >= 2;
    this.setState({
      btnDisabled: !valide,
    });
  };

  handleInputChange = async ({ target: { value } }) => {
    this.setState({
      searchArtist: value,
    }, this.valideBtn);
  };

  handleClick = async () => {
    const { searchArtist } = this.state;
    this.setState({
      loading: true,
    });
    const albums = await searchAlbumsAPI(searchArtist);
    console.log(albums);
    this.setState({
      loading: false,
      artistName: searchArtist,
      searchArtist: '',
      albums,
    });
  };

  render() {
    const { artistName, btnDisabled, loading, albums, searchArtist } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {loading ? (<Carregando />) : (
          <form>
            <input
              data-testid="search-artist-input"
              type="text"
              name="searchArtist"
              onChange={ this.handleInputChange }
              value={ searchArtist }
              placeholder="Busque por um artista ou banda"
            />
            <button
              data-testid="search-artist-button"
              disabled={ btnDisabled }
              onClick={ this.handleClick }
              type="button"
            >
              Pesquisar
            </button>
          </form>
        )}
        <div>
          {albums.length === 0 ? (
            <p>Nenhum álbum foi encontrado</p>
          ) : (
            <section>
              <h3>{`Resultado de álbuns de: ${artistName}`}</h3>
              {albums.map((album, index) => (
                <div key={ index }>
                  <Link
                    data-testid={ `link-to-album-${album.collectionId}` }
                    to={ `/album/${album.collectionId}` }
                  >

                    <img src={ album.artworkUrl100 } alt={ album.artistName } />
                    <p>{ album.collectionName }</p>
                    <p>{ album.artistName }</p>
                  </Link>
                </div>

              ))}
            </section>
          )}
        </div>

      </div>
    );
  }
}

export default Search;
