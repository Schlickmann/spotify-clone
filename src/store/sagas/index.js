// sagas/index.js
import { all, takeLatest } from "redux-saga/effects";

import { Types as PlaylistsTypes } from '../ducks/playlists';
import { Types as PlaylistDetailsTypes } from '../ducks/playlistDetails';

import { getPlaylists } from './playlists';
import { getPlaylistDetails } from "./playlistDetails";

export default function* rootSaga() {
    yield all([
        takeLatest(PlaylistsTypes.GET_RESQUEST, getPlaylists),
        takeLatest(PlaylistDetailsTypes.GET_RESQUEST, getPlaylistDetails)
    ]);
}
