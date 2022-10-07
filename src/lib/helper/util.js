const refreshPage = () => {
    window.location.reload(false);
};

const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
);

const invoke = async (action, ms) => {
    await delay(ms);
    action();
};

const addSwipeAttributeIntoAssets = (data) => {
    return data.assets.map(_asset => {
        let asset = _asset;
        asset['swipe'] = '';
        return asset;
    });
};

export default {
    addSwipeAttributeIntoAssets,
    refreshPage,
    delay,
    invoke,
};
