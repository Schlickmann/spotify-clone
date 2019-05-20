import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import Slider from 'rc-slider';
import Sound from 'react-sound';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as PlayerActions } from '../../store/ducks/player';

import { Container, Current, Volume, Progress, Controls, Time, ProgressSlider } from './styles';

import VolumeIcon from '../../assets/images/volume.svg'
import ShuffleIcon from '../../assets/images/shuffle.svg';
import BackwardIcon from '../../assets/images/backward.svg';
import PlayIcon from '../../assets/images/play.svg';
import PauseIcon from '../../assets/images/pause.svg';
import ForwardIcon from '../../assets/images/forward.svg';
import RepeatIcon from '../../assets/images/repeat.svg';

class Player extends Component {
    static propTypes = {
        player: PropTypes.shape({
            currentSong: PropTypes.shape({
                file: PropTypes.string,
                thumbnail: PropTypes.string,
                title: PropTypes.string,
                author: PropTypes.string
            }),
            status: PropTypes.string
        }).isRequired,
        play: PropTypes.func.isRequired,
        pause: PropTypes.func.isRequired,
        prev: PropTypes.func.isRequired,
        next: PropTypes.func.isRequired,
        playing: PropTypes.func.isRequired,
        position: PropTypes.string.isRequired,
        duration: PropTypes.string.isRequired,
        handlePosition: PropTypes.func.isRequired,
        setPosition: PropTypes.func.isRequired,
        positionShown: PropTypes.string.isRequired,
        progress: PropTypes.number.isRequired,
        setVolume: PropTypes.func.isRequired,
    };

    render() {
        return (
            <Container>
                { !!this.props.player.currentSong && (
                    <Sound
                        url={this.props.player.currentSong.file}
                        playStatus={this.props.player.status}
                        onFinishedPlaying={this.props.next}
                        onPlaying={this.props.playing}
                        position={this.props.player.position}
                        volume={this.props.player.volume}
                    />
                )}

                <Current>
                    { !!this.props.player.currentSong && (
                        <Fragment>
                            <img src={this.props.player.currentSong.thumbnail} alt={this.props.player.currentSong.title} />
                            <div>
                                <span>{this.props.player.currentSong.title}</span>
                                <small>{this.props.player.currentSong.author}</small>
                            </div>
                        </Fragment>
                    )}

                </Current>

                <Progress>
                    <Controls>
                        <button><img src={ShuffleIcon} alt="Shuffle" /></button>
                        <button onClick={this.props.prev}><img src={BackwardIcon} alt="Backward" /></button>
                        { !!this.props.player.currentSong && this.props.player.status === Sound.status.PLAYING ? (
                            <button onClick={this.props.pause}><img src={PauseIcon} alt="Pause" /></button>
                        ) : (
                            <button onClick={this.props.play} ><img src={PlayIcon} alt="Play" /></button>
                        )}
                        <button onClick={this.props.next}><img src={ForwardIcon} alt="Forward" /></button>
                        <button><img src={RepeatIcon} alt="Repeat" /></button>
                    </Controls>

                    <Time>
                        <span>{ this.props.positionShown || this.props.position}</span>
                        <ProgressSlider>
                            <Slider
                                railStyle={{ background: '#404040', borderRadius: 10 }}
                                trackStyle={{ background: '#1ed760' }}
                                handleStyle={{ border: 0 }}
                                max={1000}
                                onChange={value => this.props.handlePosition(value / 1000)}
                                onAfterChange={value => this.props.setPosition(value / 1000)}
                                value={this.props.progress}
                            />
                        </ProgressSlider>
                        <span>{this.props.duration}</span>
                    </Time>
                </Progress>

                <Volume>
                    <img src={VolumeIcon} alt="Volume Icon"/>
                    <Slider
                        railStyle={{ background: '#404040', borderRadius: 10 }}
                        trackStyle={{ background: '#fff' }}
                        handleStyle={{ display: 'none' }}
                        onChange={this.props.setVolume}
                        value={this.props.player.volume}
                    />
                </Volume>
            </Container>
        )
    }
}

function msToTime(duration) {
    if (!duration) return null;

    let seconds = parseInt((duration / 1000) % 60, 10);
    const minutes = parseInt((duration / (1000 * 60)) % 60, 10);

    seconds = seconds < 10 ? `0${seconds}` : seconds;

    return `${minutes}:${seconds}`;
}

const mapStateToProps = state => ({
    player: state.player,
    position: msToTime(state.player.position),
    duration: msToTime(state.player.duration),
    positionShown: msToTime(state.player.positionShown),
    progress: parseInt((state.player.positionShown || state.player.position) * (1000 / state.player.duration), 10) || 0
});

const mapDispatchToProps = dispatch => bindActionCreators(PlayerActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Player);
