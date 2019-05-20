export const Types = {
    GET_RESQUEST: 'playlistsDetails/GET_RESQUEST',
    GET_SUCCESS: 'playlistsDetails/GET_SUCCESS'
}

const INITIAL_STATE = {
    data: {},
    loading: false
}

export default function playlistsDetails(state = INITIAL_STATE, action) {
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
    getPlaylistDetailsRequest: (id) => ({ type: Types.GET_RESQUEST, payload: { id } }),
    getPlaylistDetailsSuccess: (data) => ({ type: Types.GET_SUCCESS, payload: { data } })
}
