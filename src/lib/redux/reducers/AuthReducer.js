import { LOADING_TOGGLE_ACTION, LOGIN_CONFRIMED_ACTION, LOGIN_FAILED_ACTION, LOGOUT_ACTION, SIGNUP_CONFIRM_ACTION, SIGNUP_FAILED_ACTION } from '../actions/AuthActions';

const initialState = {
    auth: {
        email: '',
        idToken: '',
        localId: '',
        expiresIn: '',
        refreshToken: '',
    },
    errorMessage: '',
    successMessage: '',
    showLoading: false
};


export function authReducer(state = initialState, action) {
    switch (action.type) {
    case SIGNUP_CONFIRM_ACTION:
        return {
            ...state,
            auth: action.payload,
            errorMessage: '',
            successMessage: 'Signup successfully completed',
            showLoading: false,
        };
    case LOGIN_CONFRIMED_ACTION:
        return {
            ...state,
            auth: action.payload,
            errorMessage: '',
            successMessage: 'Login successfully completed',
            showLoading: false,
        };
    case SIGNUP_FAILED_ACTION:
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
                email: '',
                idToken: '',
                localId: '',
                expiresIn: '',
                refreshToken: '',
            },
        };
    default:
        return state;
    }
}