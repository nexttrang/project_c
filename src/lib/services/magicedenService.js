import axios from 'axios';
import baseXRest from './baseXRest';

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
        }
    };

    return axios.request(options);
};

export const retrieveCollectionInfo = (symbol) => baseXRest.request(`nfts/magiceden_collection?symbol=${symbol}`, 'GET');

export const getListedNftsByCollection = (symbol, cursor) => {
    const url = `https://api-mainnet.magiceden.io/rpc/getListedNftsByCollectionSymbol?collectionSymbol=${symbol}&direction=1&field=2&limit=${limitNfts}&offset=${cursor}`;

    const options = {
        method: 'GET',
        url: url,
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    };

    return axios.request(options);
};