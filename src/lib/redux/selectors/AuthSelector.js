import { loadLocalUserAuth } from '../../services/authService';

const auth = (state) => state.auth.auth;
const errorMessage = (state) => state.auth.errorMessage;
const successMessage = (state) => state.auth.successMessage;

const isAuthenticated = state => {
    let localAuth = loadLocalUserAuth();

    if (localAuth.accessToken && localAuth.uid) return true;
    return false;
};

export default {
    auth,
    errorMessage,
    successMessage,
    isAuthenticated
};