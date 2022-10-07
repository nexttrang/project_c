export const keyAssets = 'assets';
export const keyNextAssets = 'next_assets';
export const keyPrevAssets = 'prev_assets';

export function saveAssetsInLocalStorage(assets, key) {
    localStorage.setItem(key, JSON.stringify(assets));
}

export function loadLocalAssets(key) {
    const assests = localStorage.getItem(key);
    if (assests == null) {
        return [];
    }

    return JSON.parse(assests);
}