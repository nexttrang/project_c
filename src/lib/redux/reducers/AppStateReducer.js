import { LOADER_POSITION_FILL_SCREEN } from '../../../components/Loader/Loader';
import { SUBSCRIBE_SCREEN_ACTION, TOGGLE_LOADING_ACTION, UNSUBSCRIBE_SCREEN_ACTION } from '../actions/AppStateAction';

const defaultLoading = {
    binding: false,
    position: LOADER_POSITION_FILL_SCREEN,
    subscribe: ''
};

const initialState = {
    screen: '',
    loading: defaultLoading
};

export function appStateReducer(state = initialState, action) {
    switch (action.type) {
        case TOGGLE_LOADING_ACTION:
            return {
                ...state,
                loading: action.payload.binding ? action.payload : defaultLoading
            };
        case SUBSCRIBE_SCREEN_ACTION:
            return {
                ...state,
                screen: action.payload,
                loading: defaultLoading
            };
        case UNSUBSCRIBE_SCREEN_ACTION:
            return {
                ...state,
                screen: '',
                loading: defaultLoading
            };
        default:
            return state;
    }
}