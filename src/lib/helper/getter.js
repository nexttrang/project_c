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

export default {
    getBlockchainInfo,
};
