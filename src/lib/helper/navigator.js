export const navigateToAssetInfo = (navigate, contactAddress, tokenId) => {
    navigate(`/asset_info/${contactAddress}/${tokenId}`);
};

export const navigateToCollectionInfo = (navigate, id) => {
    navigate(`/collection_info/${id}`);
};