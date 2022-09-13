import axios from 'axios';

const limitPerPage = 20;
export const fetchAssests = (cursor) => {

    const url = cursor
        ? `https://api.opensea.io/api/v1/assets?order_direction=desc&limit=${limitPerPage}&cursor=${cursor}&include_orders=false`
        : `https://api.opensea.io/api/v1/assets?order_direction=desc&limit=${limitPerPage}&include_orders=false`;

    const options = {
        method: 'GET',
        url: url,
    };

    return axios.request(options);
};

export const retrieveAsset = (contactAddress, tokenId) => {
    const options = {
        method: 'GET',
        url: `https://api.opensea.io/api/v1/asset/${contactAddress}/${tokenId}/?include_orders=false`
    };

    return axios.request(options);
};

export const retrieveCollection = (slug) => {
    const options = {
        method: 'GET',
        url: `https://api.opensea.io/api/v1/collection/${slug}`
    };

    return axios.request(options);
};

export const openEtherScan = (address) => {
    window.open(`https://etherscan.io/address/${address}`);
};