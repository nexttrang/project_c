import { confirmedLoginAction, logoutAction } from '../redux/actions/AuthActions';

export const keyUserDetails = 'user_details';

export function formatError(errorResponse) {

    console.log(errorResponse.error.message);

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
    localStorage.setItem(keyUserDetails, JSON.stringify(tokenDetails));
}

export function runLogOutTimer(dispatch, timer) {
    setTimeout(() => {
        dispatch(logoutAction());
    }, timer);
}

function loadLocalUserData() {
    const tokenDetailsString = localStorage.getItem(keyUserDetails);
    if (!tokenDetailsString) {
        return '';
    }

    return JSON.parse(tokenDetailsString);
}

export function checkAutoLogin(dispatch) {
    let localData = loadLocalUserData();
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
    const localData = loadLocalUserData();
    if (!localData) {
        return;
    }

    localStorage.setItem(keyUserDetails, JSON.stringify({ ...localData, ...data }));
}