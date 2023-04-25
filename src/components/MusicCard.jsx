import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Carregando from './Carregando';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  state = {
    loading: false,
  };

  componentDidMount() {
    this.recoverFavorite();
  }

  addFavorite = async () => {
    const { trackId } = this.props;
    this.setState({ loading: true });
    await addSong(trackId);
    this.setState({
      loading: false,
      checked: true,
    });
  };

  recoverFavorite = async () => {
    this.setState({
      loading: true,
    });
    await getFavoriteSongs();
    this.setState({
      loading: false,
    });
  };

  render() {
    const { trackName, trackId, previewUrl } = this.props;
    const { loading, checked } = this.state;
    return (

      loading ? (
        <Carregando />
      )
        : (
          <div>
            <h4>{ trackName }</h4>
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              {' '}
              {' '}
              <code>audio</code>
              .
            </audio>
            <label htmlFor={ trackId } data-testid={ `checkbox-music-${trackId}` }>
              Favorita
              <input
                type="checkbox"
                id={ trackId }
                onChange={ this.addFavorite }
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
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
};

export default MusicCard;
