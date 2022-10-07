export const TOGGLE_LOADING_ACTION = '[loading action] toggle loading';
export const SUBSCRIBE_SCREEN_ACTION = '[subscribe action] subscribe screen';
export const UNSUBSCRIBE_SCREEN_ACTION = '[subscribe action] unsubscribe screen';

export const toggleLoadingAction = (data) => {
    return {
        type: TOGGLE_LOADING_ACTION,
        payload: data,
    };
};

export const subscribeScreenAction = (data) => {
    return {
        type: SUBSCRIBE_SCREEN_ACTION,
        payload: data,
    };
};

export const unsubscribeScreenAction = () => {
    return {
        type: UNSUBSCRIBE_SCREEN_ACTION
    };
};