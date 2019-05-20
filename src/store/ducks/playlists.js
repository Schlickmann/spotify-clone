export const Types = {
    GET_RESQUEST: 'playlists/GET_RESQUEST',
    GET_SUCCESS: 'playlists/GET_SUCCESS'
}

const INITIAL_STATE = {
    data: [],
    loading: false
}

export default function playlists(state = INITIAL_STATE, action) {
    switch(action.type) {
        case Types.GET_RESQUEST:
            return { ...state, loading: true };
        case Types.GET_SUCCESS:
            return { ...state, loading: false, data: action.payload.data };
        default:
            return state;
    }
}

export const Creators = {
    getPlaylistRequest: () => ({ type: Types.GET_RESQUEST }),
    getPlaylistSuccess: (data) => ({ type: Types.GET_SUCCESS, payload: { data } })
}

