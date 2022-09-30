import { LOADING_TOGGLE_ACTION, LOGOUT_ACTION, LOGIN_FAILED_ACTION, LOGIN_CONFRIMED_ACTION, MAPPING_GOOGLE_ACCOUNT_CONFRIMED_ACTION } from '../actions/AuthActions';

const initialState = {
    auth: {
        uid: '',
        emailVerified: '',
        isAnonymous: '',
        email: '',
        displayName: '',
        avatar: '',
        refreshToken: '',
        accessToken: '',
        expiresIn: '',
    },
    errorMessage: '',
    successMessage: '',
    showLoading: false
};

export function authReducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN_CONFRIMED_ACTION:
            return {
                ...state,
                auth: action.payload,
                errorMessage: '',
                successMessage: 'User logined',
                showLoading: false,
            };
        case MAPPING_GOOGLE_ACCOUNT_CONFRIMED_ACTION:
            return {
                ...state,
                auth: {
                    ...state.auth,
                    emailVerified: true,
                    isAnonymous: false,
                    email: action.payload.email,
                    displayName: action.payload.displayName,
                    avatar: action.payload.avatar
                }
            };
        case LOGIN_FAILED_ACTION:
            return {
                ...state,
                errorMessage: action.payload,
                successMessage: '',
                showLoading: false,
            };
        case LOADING_TOGGLE_ACTION:
            return {
                ...state,
                showLoading: action.payload
            };
        case LOGOUT_ACTION:
            return {
                ...state,
                auth: {
                    uid: '',
                    emailVerified: '',
                    isAnonymous: '',
                    email: '',
                    displayName: '',
                    avatar: '',
                    refreshToken: '',
                    accessToken: '',
                    expiresIn: '',
                },
            };
        default:
            return state;
    }
}