import getter from '../../helper/getter';
import { formatError, keyUserDetails, runLogOutTimer, saveGoogleAccountInLocalStorage, saveTokenInLocalStorage } from '../../services/authService';
import { getMappingAccountResult, loginGuestUser } from '../../services/firebaseService';


export const SIGNUP_CONFIRM_ACTION = '[signup action] confirmed signup';
export const SIGNUP_FAILED_ACTION = '[signup action] failed signup';
export const LOGIN_CONFRIMED_ACTION = '[login action] confirmed login';
export const LOGIN_FAILED_ACTION = '[login action] failed login';
export const LOADING_TOGGLE_ACTION = '[loading action] toggle loading';
export const LOGOUT_ACTION = '[logout action] logout action';
export const MAPPING_GOOGLE_ACCOUNT_CONFRIMED_ACTION = '[mapping action] confirmed mapping google';

export function logoutAction() {
    localStorage.removeItem(keyUserDetails);

    return {
        type: LOGOUT_ACTION,
    };
}

export function loginAction() {
    return (dispatch) => {
        loginGuestUser()
            .then(response => {
                const data = getter.parseGuestUserData(response.user);

                saveTokenInLocalStorage(data);
                runLogOutTimer(dispatch, data.expiresIn * 1000);
                dispatch(confirmedLoginAction(data));
            })
            .catch(error => {
                const errorMesage = formatError(error.response.data);
                dispatch(loginFailedAction(errorMesage));
            });
    };
}

export function mappingGoogleAccountAction() {
    return (dispatch) => {
        getMappingAccountResult().then(result => {

            const data = getter.parseMappingGoogleAccountData(result.user);

            console.log(`result: ${JSON.stringify(data)}`);

            saveGoogleAccountInLocalStorage(data);
            dispatch(confirmedMappingGoogleAccountAction(data));
        }).catch(error => {
            console.log(error);
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

export function loadingToggleAction(status) {
    return {
        type: LOADING_TOGGLE_ACTION,
        payload: status,
    };
}

export function confirmedMappingGoogleAccountAction(data) {
    return {
        type: MAPPING_GOOGLE_ACCOUNT_CONFRIMED_ACTION,
        payload: data
    };
}