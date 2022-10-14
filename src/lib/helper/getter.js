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

const shortText = (originText) => {
    const length = originText.length;
    if (length <= 10) {
        return originText;
    }

    const frontPart = originText.substring(0, 6);
    const endpart = originText.substring(length - 1, length - 5);

    return `${frontPart}...${endpart}`;
};

const chunksOfArray = (array, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
        chunks.push(array.slice(i, i + chunkSize));
    }

    return chunks;
};

const encodeLikedCard = (params) => {
    let result = '';

    params.forEach(param => {
        if (params.indexOf(param) < params.length - 1) {
            result += param + '#';
        }
        else {
            result += param;
        }
    });
    return result;
};

const decodeLikedCard = (encoded) => {
    const parts = encoded.split('#');

    return parts;
};

const imageFromAsset = (data) => {
    return data.image_url ? data.image_url : data.image;
};

const idFromAsset = (data) => {
    return data.id ? data.id : data.symbol;
};

export default {
    getBlockchainInfo,
    parseGuestUserData,
    parseMappingGoogleAccountData,
    shortText,
    chunksOfArray,
    encodeLikedCard,
    decodeLikedCard,
    imageFromAsset,
    idFromAsset
};
