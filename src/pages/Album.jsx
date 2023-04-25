import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  state = {
    musics: [],
    artistName: '',
    albumName: '',
  };

  componentDidMount() {
    this.handleMusic();
  }

  handleMusic = async () => {
    const { match: { params: { id } } } = this.props;
    let musicApi = await getMusics(id);
    musicApi = musicApi.filter((music) => music.trackName);
    this.setState({
      musics: musicApi,
      artistName: musicApi[0].artistName,
      albumName: musicApi[0].collectionName,
    });
  };

  render() {
    const { musics, artistName, albumName } = this.state;
    return (
      <div data-testid="page-album">
        Album
        <Header />
        <div>
          <h4 data-testid="album-name">{ albumName }</h4>
          <p data-testid="artist-name">{ artistName }</p>
        </div>
        <div>
          {musics.map((music, index) => (
            <div key={ index }>
              <MusicCard
                musics={ music.trackId }
                musics2={ music.previewUrl }
                trackName={ music.trackName }
              />
            </div>
          ))}
        </div>

      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
