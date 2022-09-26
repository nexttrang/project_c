const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
};

const isStrongPassword = (password) => {
    return password.length > 5;
};

export default {
    isValidEmail,
    isStrongPassword,
};
