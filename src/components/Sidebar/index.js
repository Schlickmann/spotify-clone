import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Creators as PlaylistActions } from '../../store/ducks/playlists'

import { Container, NewPlaylist, Nav } from './styles'

import  Loading from '../Loading';

import AddPlayListIcon from '../../assets/images/plus.svg';

class Sidebar extends Component {
    static propTypes = {
        getPlaylistRequest: PropTypes.func.isRequired,
        playlists: PropTypes.shape({
            data: PropTypes.arrayOf(PropTypes.shape({
                id: PropTypes.number,
                title: PropTypes.string
            })),
            loading: PropTypes.bool
        }).isRequired
    }

    componentDidMount() {
        this.props.getPlaylistRequest();
    }

    render() {
        return (
            <Container>
                <div>
                    <Nav main>
                        <li>
                            <span>MAIN</span>
                        </li>
                        <li>
                            <Link to="/">Browse</Link>
                        </li>
                        <li>
                            <a href="">Radio</a>
                        </li>
                    </Nav>
                    <Nav>
                        <li>
                            <span>LIBRARY</span>
                        </li>
                        <li>
                            <a href="">Made for you</a>
                        </li>
                        <li>
                            <a href="">Recently Played</a>
                        </li>
                        <li>
                            <a href="">Favorite Songs</a>
                        </li>
                        <li>
                            <a href="">Albuns</a>
                        </li>
                        <li>
                            <a href="">Artists</a>
                        </li>
                        <li>
                            <a href="">Stations</a>
                        </li>
                        <li>
                            <a href="">Local Files</a>
                        </li>
                        <li>
                            <a href="">Videos</a>
                        </li>
                        <li>
                            <a href="">Podcasts</a>
                        </li>
                    </Nav>
                    <Nav>
                        <li>
                            <span>PLAYLISTS</span>
                            {this.props.playlists.loading && <Loading />}
                        </li>
                        {this.props.playlists.data.map(playlist => (
                            <li key={playlist.id}>
                                <Link to={`/playlists/${playlist.id}`}>{playlist.title}</Link>
                            </li>
                        ))}
                    </Nav>
                </div>
                <NewPlaylist>
                    <img src={AddPlayListIcon} alt="Add playlist" />
                    New Playlist
                </NewPlaylist>
            </Container>
        );
    }
}


const mapStateToProps = state => ({
    playlists: state.playlists
});

const mapDispatchToProps = dispatch => bindActionCreators(PlaylistActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
