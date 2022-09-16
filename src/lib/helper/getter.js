const getBlockchainInfo = (schema_version) => {
    switch (schema_version) {
    case 'ERC1155':
        return {
            token_standard: 'ERC-1155',
            blockchain: 'Ethereum'
        };
    case 'ERC721':
        return {
            token_standard: 'ERC-721',
            blockchain: 'Ethereum'
        };
    default:
        return {
            token_standard: 'undefined',
            blockchain: 'undefined'
        };
    }
};

const parseGuestUserData = (json) => {
    return {
        uid: json.uid,
        emailVerified: json.emailVerified,
        isAnonymous: json.isAnonymous,
        refreshToken: json.stsTokenManager.refreshToken,
        accessToken: json.stsTokenManager.accessToken,
        expiresIn: '3600',
    };
};

const parseMappingGoogleAccountData = (json) => {
    return {
        email: json.email,
        displayName: json.displayName,
        avatar: json.photoURL
    };
};

export default {
    getBlockchainInfo,
    parseGuestUserData,
    parseMappingGoogleAccountData
};
