import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Carregando from './Carregando';
import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  state = {
    loading: false,
  };

  handleFavoriteChange = async ({ target }) => {
    const { value } = target;
    console.log(value);
    const { musics } = this.props;
    this.setState({ loading: true });
    await addSong(musics);
    this.setState({
      loading: false,
      checked: true,
    });
  };

  render() {
    const { trackName, musics, musics2 } = this.props;
    const { loading, checked } = this.state;
    return (

      loading ? (
        <Carregando />
      )
        : (
          <div>
            <h4>{ trackName }</h4>
            <audio data-testid="audio-component" src={ musics2 } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              {' '}
              {' '}
              <code>audio</code>
              .
            </audio>
            <label htmlFor={ musics } data-testid={ `checkbox-music-${musics}` }>
              Favorita
              <input
                type="checkbox"
                id={ musics }
                onChange={ this.handleFavoriteChange }
                checked={ checked }
              />
            </label>
          </div>
        )

    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  musics2: PropTypes.string.isRequired,
  musics: PropTypes.number.isRequired,
};

export default MusicCard;
