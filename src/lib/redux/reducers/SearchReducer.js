import { NFTS_SEARCH_ACTION } from '../actions/SearchAction';

const initSate = {
    nft_query: '',
};

const searchReducer = (state = initSate, action) => {
    switch (action.type) {
        case NFTS_SEARCH_ACTION:
            return {
                ...state,
                nft_query: action.payload,
            };
        default:
            return state;
    }
};

export default searchReducer;
