import { call, put } from 'redux-saga/effects';
import api from '../../services/api';

import { Creators as PlaylistsActions } from '../ducks/playlists';
import { Creators as ErrorActions } from '../ducks/error';

export function* getPlaylists() {
    try {
        const response = yield call(api.get, '/playlists');

        yield put(PlaylistsActions.getPlaylistSuccess(response.data));
    } catch(err) {
        yield put(ErrorActions.setError('Something went wrong.'));
    }
}
