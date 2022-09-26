const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
};

const isStrongPassword = (password) => {
    return password.length > 5;
};

const isConnectorNotFoundError = (str) => {
    return str.includes('ConnectorNotFoundError');
};

export default {
    isValidEmail,
    isStrongPassword,
    isConnectorNotFoundError
};
