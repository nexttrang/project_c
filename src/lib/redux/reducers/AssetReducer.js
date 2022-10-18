import { CONFIRMED_ASSETS_IMPORT_ACTION, CONFIRMED_FULLDATA_IMPORT_ACTION, CONFIRMED_NEXT_ASSETS_IMPORT_ACTION, CONFIRMED_PREVIOUS_ASSETS_IMPORT_ACTION, CONFIRMED_UPDATE_AFTER_CURSOR_ACTION, CONFIRMED_UPDATE_BEFORE_CURSOR_ACTION, CONFIRMED_UPDATE_CURRENT_CURSOR_ACTION } from '../actions/AssetActions';

const initSate = {
    assets: [],
    next_assets: [],
    prev_assets: [],
    cursor: {
        after: '',
        before: '',
        current: ''
    }
};

const assetReducer = (state = initSate, action) => {
    switch (action.type) {
        case CONFIRMED_FULLDATA_IMPORT_ACTION:
            return {
                ...action.payload
            };
        case CONFIRMED_ASSETS_IMPORT_ACTION:
            return {
                ...state,
                assets: action.payload,
            };
        case CONFIRMED_NEXT_ASSETS_IMPORT_ACTION:
            return {
                ...state,
                next_assets: action.payload
            };
        case CONFIRMED_PREVIOUS_ASSETS_IMPORT_ACTION:
            return {
                ...state,
                prev_assets: action.payload
            };
        case CONFIRMED_UPDATE_AFTER_CURSOR_ACTION:
            return {
                ...state,
                cursor: {
                    ...state.cursor,
                    after: action.payload
                }
            };
        case CONFIRMED_UPDATE_BEFORE_CURSOR_ACTION:
            return {
                ...state,
                cursor: {
                    ...state.cursor,
                    before: action.payload
                }
            };
        case CONFIRMED_UPDATE_CURRENT_CURSOR_ACTION:
            return {
                ...state,
                cursor: {
                    ...state.cursor,
                    current: action.payload
                }
            };
        default:
            return state;
    }
};

export default assetReducer;
