import logger from '../../helper/logger';
import util from '../../helper/util';
import { keyAfterCursor, keyAssets, keyBeforeCursor, keyCurrentCursor, keyNextAssets, keyPrevAssets, loadFullDataAssets, saveAssetsInLocalStorage, saveFullDataInLocalStorage } from '../../services/assetService';
import { fetchTopNfts } from '../../services/firebaseService';

export const CONFIRMED_ASSETS_IMPORT_ACTION = '[assets action] import assets';
export const CONFIRMED_NEXT_ASSETS_IMPORT_ACTION = '[assets action] import next assets';
export const CONFIRMED_PREVIOUS_ASSETS_IMPORT_ACTION = '[assets action] import prev assets';
export const CONFIRMED_UPDATE_AFTER_CURSOR_ACTION = '[assets action] update after cursor';
export const CONFIRMED_UPDATE_BEFORE_CURSOR_ACTION = '[assets action] update before cursor';
export const CONFIRMED_UPDATE_CURRENT_CURSOR_ACTION = '[assets action] update current cursor';
export const CONFIRMED_FULLDATA_IMPORT_ACTION = '[assets action] import fulldata';

export const loadAssestsAction = (cursor, key) => {
    return (dispatch) => {
        fetchTopNfts(cursor).then(response => {
            const data = response.data;
            logger.log('AssetAction', `fetchTopNfts: ${JSON.stringify(data)} - cursor: ${cursor} - key: ${key}`);

            dispatch(importAssetsAction(util.addSwipeAttributeIntoAssets(data), key));

            switch (key) {
                case keyAssets:
                    dispatch(updateCursorAction(cursor, keyCurrentCursor));
                    dispatch(loadAssestsAction(data.next, keyNextAssets));
                    dispatch(loadAssestsAction(data.prev, keyPrevAssets));
                    break;
                case keyNextAssets:
                    dispatch(updateCursorAction(data.next, keyAfterCursor));
                    break;
                case keyPrevAssets:
                    dispatch(updateCursorAction(data.prev, keyBeforeCursor));
                    break;
                default:
                    break;
            }
        }).catch(error => {
            logger.log('AssetAction', `fetchTopNfts error: ${error}`);
        });
    };
};

export const importAssetsAction = (data, key) => {
    return (dispatch) => {
        saveAssetsInLocalStorage(data, key);
        dispatch(confirmedImportAssetsAction(data, key));
    };
};

export const importFullDataAssetsAction = (data) => {
    return (dispatch) => {
        saveFullDataInLocalStorage(data);
        dispatch(confirmImportFullDataAssetsAction(data));
    };
};

export const updateCursorAction = (cursor, key) => {
    return (dispatch) => {
        logger.log(`update curosr: ${cursor} - key:${key}`);
        saveAssetsInLocalStorage(cursor, key);
        dispatch(confirmUpdateCursor(cursor, key));
    };
};

export const confirmedImportAssetsAction = (data, key) => {
    switch (key) {
        case keyAssets:
            return {
                type: CONFIRMED_ASSETS_IMPORT_ACTION,
                payload: data,
            };
        case keyNextAssets:
            return {
                type: CONFIRMED_NEXT_ASSETS_IMPORT_ACTION,
                payload: data,
            };
        case keyPrevAssets:
            return {
                type: CONFIRMED_PREVIOUS_ASSETS_IMPORT_ACTION,
                payload: data,
            };
        default:
            return;
    }
};

export const confirmUpdateCursor = (data, key) => {
    switch (key) {
        case keyAfterCursor:
            return {
                type: CONFIRMED_UPDATE_AFTER_CURSOR_ACTION,
                payload: data,
            };
        case keyBeforeCursor:
            return {
                type: CONFIRMED_UPDATE_BEFORE_CURSOR_ACTION,
                payload: data,
            };
        case keyCurrentCursor:
            return {
                type: CONFIRMED_UPDATE_CURRENT_CURSOR_ACTION,
                payload: data,
            };
        default:
            break;
    }
};

export const confirmImportFullDataAssetsAction = (data) => {
    return {
        type: CONFIRMED_FULLDATA_IMPORT_ACTION,
        payload: data,
    };
};