export const ASSETS_IMPORT_ACTION = '[profile action] import profile';

export const importAssets = (data) => {
    return {
        type: ASSETS_IMPORT_ACTION,
        payload: data,
    };
};
