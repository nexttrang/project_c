import { confirmedLoginAction, logoutAction } from '../redux/actions/AuthActions';

export const keyUserAuth = 'user_auth';
export const keyUserData = 'user_data';

export function formatError(errorResponse) {
    switch (errorResponse.error.message) {
        case 'EMAIL_EXISTS':
            return 'Email already exists';
        case 'EMAIL_NOT_FOUND':
            return 'Email not found';
        case 'INVALID_PASSWORD':
            return 'Invalid password';
        case 'INVALID_EMAIL':
            return 'Invalid email';
        case 'USER_DISABLED':
            return 'User disabled';
        default:
            return errorResponse.error.message;
    }
}

export function saveTokenInLocalStorage(tokenDetails) {
    tokenDetails.expireDate = new Date(new Date().getTime() + tokenDetails.expiresIn * 1000);
    localStorage.setItem(keyUserAuth, JSON.stringify(tokenDetails));
}

export function saveUserDataInLocalStorage(data) {
    localStorage.setItem(keyUserData, JSON.stringify(data));
}

export function runLogOutTimer(dispatch, timer) {
    setTimeout(() => {
        dispatch(logoutAction());
    }, timer);
}

export function loadLocalUserAuth() {
    const tokenDetailsString = localStorage.getItem(keyUserAuth);
    if (!tokenDetailsString) {
        return '';
    }

    return JSON.parse(tokenDetailsString);
}

export function loadLocalUserData() {
    const userData = localStorage.getItem(keyUserData);
    if (!userData) {
        return {};
    }

    return JSON.parse(userData);
}

export function checkAutoLogin(dispatch) {
    let localData = loadLocalUserAuth();
    if (!localData) {
        dispatch(logoutAction());
        return;
    }

    let expireDate = new Date(localData.expireDate);
    let todaysDate = new Date();

    if (todaysDate > expireDate) {
        dispatch(logoutAction());
        return;
    }
    dispatch(confirmedLoginAction(localData));

    const timer = expireDate.getTime() - todaysDate.getTime();
    runLogOutTimer(dispatch, timer);
}

export function saveGoogleAccountInLocalStorage(data) {
    const localData = loadLocalUserAuth();
    if (!localData) {
        return;
    }

    localStorage.setItem(keyUserAuth, JSON.stringify({ ...localData, ...data }));
}

export const getAccessToken = () => {
    return loadLocalUserAuth().accessToken;
};