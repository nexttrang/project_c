import { formatError, keyUserDetails, login, runLogOutTimer, saveTokenInLocalStorage, singUp } from '../../services/authService';

export const SIGNUP_CONFIRM_ACTION = '[signup action] confirmed signup';
export const SIGNUP_FAILED_ACTION = '[signup action] failed signup';
export const LOGIN_CONFRIMED_ACTION = '[login action] confirmed login';
export const LOGIN_FAILED_ACTION = '[login action] failed login';
export const LOADING_TOGGLE_ACTION = '[loading action] toggle loading';
export const LOGOUT_ACTION = '[logout action] logout action';

export function signUpAction(email, password) {
    return (dispatch) => {
        singUp(email, password)
            .then(response => {
                saveTokenInLocalStorage(response.data);
                dispatch(confirmedSignUpAction(response.data));
            })
            .catch(error => {
                const errorMesage = formatError(error.response.data);
                dispatch(signUpFailedAction(errorMesage));
            });
    };
}

export function logoutAction() {
    localStorage.removeItem(keyUserDetails);

    return {
        type: LOGOUT_ACTION,
    };
}

export function loginAction(email, password) {
    return (dispatch) => {
        login(email, password)
            .then((response) => {
                saveTokenInLocalStorage(response.data);
                runLogOutTimer(dispatch, response.data.expiresIn * 1000);
                dispatch(confirmedLoginAction(response.data));
            })
            .catch(error => {
                const errorMesage = formatError(error.response.data);
                dispatch(loginFailedAction(errorMesage));
            });
    };
}

export function confirmedLoginAction(data) {
    return {
        type: LOGIN_CONFRIMED_ACTION,
        payload: data
    };
}

export function loginFailedAction(message) {
    return {
        type: LOGIN_FAILED_ACTION,
        payload: message
    };
}

export function confirmedSignUpAction(payload) {
    return {
        type: SIGNUP_CONFIRM_ACTION,
        payload,
    };
}

export function signUpFailedAction(message) {
    return {
        type: SIGNUP_FAILED_ACTION,
        payload: message,
    };
}

export function loadingToggleAction(status) {
    return {
        type: LOADING_TOGGLE_ACTION,
        payload: status,
    };
}