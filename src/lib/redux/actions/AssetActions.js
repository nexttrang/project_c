import util from '../../helper/util';
import { keyAssets, keyNextAssets, keyPrevAssets, saveAssetsInLocalStorage } from '../../services/assetService';
import { fetchTopNfts } from '../../services/firebaseService';

export const CONFIRMED_ASSETS_IMPORT_ACTION = '[assets action] import assets';
export const CONFIRMED_NEXT_ASSETS_IMPORT_ACTION = '[assets action] import next assets';
export const CONFIRMED_PREVIOUS_ASSETS_IMPORT_ACTION = '[assets action] import prev assets';
export const CONFIRMED_UPDATE_AFTER_CURSOR_ACTION = '[assets action] update after cursor';
export const CONFIRMED_UPDATE_BEFORE_CURSOR_ACTION = '[assets action] update before cursor';

export const loadAssestsAction = (cursor, key) => {
    return (dispatch) => {
        fetchTopNfts(cursor).then(response => {
            const data = response.data;
            // console.log(data);

            dispatch(importAssetsAction(util.addSwipeAttributeIntoAssets(data), key));

            switch (key) {
                case keyAssets:
                    dispatch(loadAssestsAction(data.next, keyNextAssets));
                    dispatch(loadAssestsAction(data.prev, keyPrevAssets));
                    break;
                case keyNextAssets:
                    dispatch(confirmUpdateCursor(data.next, keyNextAssets));
                    break;
                case keyPrevAssets:
                    dispatch(confirmUpdateCursor(data.prev, keyPrevAssets));
                    break;
                default:
                    break;
            }
        }).catch(error => {
            console.log(error);
        });
    };
};

export const importAssetsAction = (data, key) => {
    return (dispatch) => {
        saveAssetsInLocalStorage(data, key);
        dispatch(confirmedImportAssetsAction(data, key));
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
        case keyNextAssets:
            return {
                type: CONFIRMED_UPDATE_AFTER_CURSOR_ACTION,
                payload: data,
            };
        case keyPrevAssets:
            return {
                type: CONFIRMED_UPDATE_BEFORE_CURSOR_ACTION,
                payload: data,
            };
        default:
            break;
    }
};