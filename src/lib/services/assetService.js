import getter from '../helper/getter';
import logger from '../helper/logger';

export const keyAssets = 'assets';
export const keyNextAssets = 'next_assets';
export const keyPrevAssets = 'prev_assets';
export const keyDataAssets = 'data_assets';
export const keyAfterCursor = 'after';
export const keyBeforeCursor = 'before';
export const keyCurrentCursor = 'current';

export function saveAssetsInLocalStorage(data, key) {
    let importData = {
        ...loadFullDataAssets(),
    };

    if (key === keyAfterCursor || key === keyBeforeCursor || key === keyCurrentCursor) {
        let cursorData = {
            ...importData['cursor']
        };

        cursorData[key] = data ? data : 0;
        importData['cursor'] = cursorData;
    } else {
        importData[key] = data;
    }

    importData['timestamp'] = getter.unixTimeNow();

    localStorage.setItem(keyDataAssets, JSON.stringify(importData));
}

export function saveFullDataInLocalStorage(data) {
    data['timestamp'] = getter.unixTimeNow();
    localStorage.setItem(keyDataAssets, JSON.stringify(data));
}

export function loadLocalAssets(key) {
    const localData = loadFullDataAssets();

    if (localData == null || !(key in localData) || localData[key] == null || localData[key].length == 0) {
        return null;
    }

    return JSON.parse(localData[key]);
}

export function loadFullDataAssets() {
    const localData = localStorage.getItem(keyDataAssets);
    if (localData == null) {
        return null;
    }

    return JSON.parse(localData);
}