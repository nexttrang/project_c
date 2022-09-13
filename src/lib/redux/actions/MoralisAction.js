import { getNativeBalance, keyNativeBalance, keyWalletSignature, saveNativeBalanceInLocalStorage, saveSignatureInLocalStorage } from '../../services/moralisService';

export const NATIVE_BALANCE_IMPORT_CONFIRM_ACTION = '[moralis action] import native balance';
export const METAMASK_VERIFY_CONFIRM_ACTION = '[moralis action] verify metamask';
export const DISCONNECT_WALLET_ACTION = '[moralis action] disconnect wallet';

export function importNativeBalanceAction(address) {
    return (dispatch) => {
        getNativeBalance(address).then(result => {
            const data = {
                balance: result.result.balance.ether,
                address: address
            };

            saveNativeBalanceInLocalStorage(data);
            dispatch(confirmImportNativeBalanceAction(data));
        }).catch(error => {
            console.log(`moralis error: ${error}`);
        });
    };
}

export function importSignatureAction(signature) {
    return (dispatch) => {
        saveSignatureInLocalStorage(signature);
        dispatch(confirmMetaMaskVerify(signature));
    };
}

export function disconnectWalletAction() {
    localStorage.removeItem(keyWalletSignature);
    localStorage.removeItem(keyNativeBalance);
    return {
        type: DISCONNECT_WALLET_ACTION
    };
}

export const confirmImportNativeBalanceAction = (data) => {
    return {
        type: NATIVE_BALANCE_IMPORT_CONFIRM_ACTION,
        payload: data,
    };
};

export const confirmMetaMaskVerify = (data) => {
    return {
        type: METAMASK_VERIFY_CONFIRM_ACTION,
        payload: data,
    };
};