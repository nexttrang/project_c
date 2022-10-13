import axios from 'axios';

const limitNfts = 20;

export const fetchCollections = (cursor, limitCollections) => {

    if (!cursor) {
        cursor = 0;
    }

    const url = `https://api-mainnet.magiceden.dev/v2/collections?offset=${cursor}&limit=${limitCollections}`;

    const options = {
        method: 'GET',
        url: url,
        headers: {
            'access-control-allow-origin': '*'
        }
    };

    return axios.request(options);
};

export const retrieveCollectionInfo = (symbol) => {
    const url = `https://api-mainnet.magiceden.dev/v2/collections/${symbol}`;

    const options = {
        method: 'GET',
        url: url,
        headers: {
            'access-control-allow-origin': '*',
            'sec-fetch-site': 'cross-site',
            'sec-fetch-mode': 'cors',
            'sec-fetch-dest': 'empty',
            'origin': 'https://king-prawn-app-jg2si.ondigitalocean.app',
        }
    };

    return axios.request(options);
};

export const getListedNftsByCollection = (symbol, cursor) => {
    const url = `https://api-mainnet.magiceden.io/rpc/getListedNftsByCollectionSymbol?collectionSymbol=${symbol}&direction=1&field=2&limit=${limitNfts}&offset=${cursor}`;

    const options = {
        method: 'GET',
        url: url,
        headers: {
            'access-control-allow-origin': '*',
            'sec-fetch-site': 'cross-site',
            'sec-fetch-mode': 'cors',
            'sec-fetch-dest': 'empty',
            'origin': 'https://king-prawn-app-jg2si.ondigitalocean.app',
        }
    };

    return axios.request(options);
};