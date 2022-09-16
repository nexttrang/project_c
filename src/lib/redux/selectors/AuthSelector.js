const auth = (state) => state.auth.auth;
const errorMessage = (state) => state.auth.errorMessage;
const successMessage = (state) => state.auth.successMessage;

const isAuthenticated = state => {
    if (state.auth.auth.accessToken) return true;
    return false;
};

export default {
    auth,
    errorMessage,
    successMessage,
    isAuthenticated
};