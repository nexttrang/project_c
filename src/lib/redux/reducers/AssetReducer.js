import { ASSETS_IMPORT_ACTION } from '../actions/AssetActions';

const initSate = {
    assets: [],
};

const assetReducer = (state = initSate, action) => {
    switch (action.type) {
        case ASSETS_IMPORT_ACTION:
            return {
                ...state,
                assets: action.payload,
            };
        default:
            return state;
    }
};

export default assetReducer;
