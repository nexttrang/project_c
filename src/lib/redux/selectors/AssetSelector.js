const magicedenAsset = (state, id) => state.asset.assets.filter(asset => asset.id === id)[0];

const openseaAsset = (state, address, tokenId) => state.asset.assets.filter(asset => 'asset_contract' in asset && asset.asset_contract.address === address && asset.token_id === tokenId)[0];

export default {
    magicedenAsset,
    openseaAsset
};