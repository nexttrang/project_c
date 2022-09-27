import { loadLocalUserData } from '../../services/authService';

const auth = (state) => state.auth.auth;
const errorMessage = (state) => state.auth.errorMessage;
const successMessage = (state) => state.auth.successMessage;

const isAuthenticated = state => {
    let localData = loadLocalUserData();

    if (localData.accessToken && localData.uid) return true;
    return false;
};

export default {
    auth,
    errorMessage,
    successMessage,
    isAuthenticated
};