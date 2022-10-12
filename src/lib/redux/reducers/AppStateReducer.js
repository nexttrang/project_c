import { LOADER_POSITION_FILL_SCREEN } from '../../../components/Loader/Loader';
import { CLOSE_WEB_POPUP_ACTION, OPEN_WEB_POPUP_ACTION, SUBSCRIBE_SCREEN_ACTION, TOGGLE_LOADING_ACTION, UNSUBSCRIBE_SCREEN_ACTION } from '../actions/AppStateAction';

const defaultLoading = {
    binding: false,
    position: LOADER_POSITION_FILL_SCREEN,
    subscribe: '',
};

const initialState = {
    screen: '',
    loading: defaultLoading,
    web_popup: '',
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
        case OPEN_WEB_POPUP_ACTION:
            return {
                ...state,
                web_popup: action.payload,
            };
        case CLOSE_WEB_POPUP_ACTION:
            return {
                ...state,
                web_popup: '',
            };
        default:
            return state;
    }
}