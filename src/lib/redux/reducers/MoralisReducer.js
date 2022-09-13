import { NATIVE_BALANCE_IMPORT_CONFIRM_ACTION, METAMASK_VERIFY_CONFIRM_ACTION, DISCONNECT_WALLET_ACTION } from '../actions/MoralisAction';

const initSate = {
    native_balance: {
        balance: '',
        address: ''
    },
    signature: '',
};

const moralisReducer = (state = initSate, action) => {
    switch (action.type) {
    case NATIVE_BALANCE_IMPORT_CONFIRM_ACTION:
        return {
            ...state,
            native_balance: action.payload,
        };
    case METAMASK_VERIFY_CONFIRM_ACTION:
        return {
            ...state,
            signature: action.payload
        };
    case DISCONNECT_WALLET_ACTION:
        return {
            ...state,
            native_balance: {
                balance: '',
                address: ''
            },
            signature: '',
        };
    default:
        return state;
    }
};

export default moralisReducer;
