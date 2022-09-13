import axios from 'axios';
import { confirmedLoginAction, logoutAction } from '../redux/actions/AuthActions';

export const keyUserDetails = 'user_details';

export function singUp(email, password) {

    const postData = {
        email,
        password,
        returnSecureToken: true,
    };

    return axios.post(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDU92RhM4bsl2Su0pKrl8g20fMWISS9wl4',
        postData
    );
}

export function login(email, password) {

    const postData = {
        email,
        password,
        returnSecureToken: true,
    };

    return axios.post(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDU92RhM4bsl2Su0pKrl8g20fMWISS9wl4',
        postData
    );
}

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

export function checkAutoLogin(dispatch) {
    const tokenDetailsString = localStorage.getItem(keyUserDetails);
    let tokenDetails = '';
    if (!tokenDetailsString) {
        dispatch(logoutAction());
        return;
    }

    tokenDetails = JSON.parse(tokenDetailsString);
    let expireDate = new Date(tokenDetails.expireDate);
    let todaysDate = new Date();

    if (todaysDate > expireDate) {
        dispatch(logoutAction());
        return;
    }
    dispatch(confirmedLoginAction(tokenDetails));

    const timer = expireDate.getTime() - todaysDate.getTime();
    runLogOutTimer(dispatch, timer);
}