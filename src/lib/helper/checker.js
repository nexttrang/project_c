const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
};

const isStrongPassword = (password) => {
    return password.length > 5;
};

const isConnectorNotFoundError = (error) => {
    return error.includes('ConnectorNotFoundError');
};

export default {
    isValidEmail,
    isStrongPassword,
    isConnectorNotFoundError,
};
