import Moralis from 'moralis';
import { EvmChain } from '@moralisweb3/evm-utils';
import { confirmImportNativeBalanceAction, confirmMetaMaskVerify } from '../redux/actions/MoralisAction';

Moralis.start({
    apiKey: process.env.REACT_APP_MORALIS_API_KEY,
});

export const keyNativeBalance = 'native_balance';
export const keyWalletSignature = 'wallet_signature';

export const getNativeBalance = (address) => {
    return Moralis.EvmApi.balance.getNativeBalance({
        chain: EvmChain.ETHEREUM,
        address: address,
    });
};

export function saveNativeBalanceInLocalStorage(data) {
    console.log(`local data: ${data}`);
    localStorage.setItem(keyNativeBalance, JSON.stringify(data));
}

export function loadLocalNativeBalance(dispatch) {
    const nativeBalanceString = localStorage.getItem(keyNativeBalance);

    if (!nativeBalanceString) {
        return;
    }

    const nativeBalance = JSON.parse(nativeBalanceString);
    dispatch(confirmImportNativeBalanceAction(nativeBalance));
}

export function saveSignatureInLocalStorage(signature) {
    localStorage.setItem(keyWalletSignature, JSON.stringify(signature));
}

export function loadLocalSignature(dispatch) {
    const signatureString = localStorage.getItem(keyWalletSignature);

    if (!signatureString) {
        return;
    }

    const signature = JSON.parse(signatureString);
    dispatch(confirmMetaMaskVerify(signature));
}

