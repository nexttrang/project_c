export const NFTS_SEARCH_ACTION = '[search action] query nft';

export const searchNFTs = (data) => {
    return {
        type: NFTS_SEARCH_ACTION,
        payload: data,
    };
};
