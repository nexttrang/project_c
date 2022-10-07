import { FETCH_USER_DATA_CONFIRM_ACTION } from '../actions/UserAction';

const initialState = {
    data: {
        liked: []
    }
};

export function userReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_USER_DATA_CONFIRM_ACTION:
            return {
                ...state,
                data: action.payload
            };
        default:
            return state;
    }
}