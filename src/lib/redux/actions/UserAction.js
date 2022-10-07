import { saveUserDataInLocalStorage } from '../../services/authService';
import { userFetch, userLikeCard } from '../../services/firebaseService';

export const FETCH_USER_DATA_CONFIRM_ACTION = '[fetch action] confirmed fetch user data';

export function fetchUserDataAction() {
    return (dispatch) => {
        userFetch()
            .then(response => {
                const data = response.data;
                console.log(`userData: ${JSON.stringify(data)}`);
                saveUserDataInLocalStorage(data);
                dispatch(confirmedFetchUserDataAction(data));
            })
            .catch(error => {
                console.log(error);
            });
    };
}

export function userLikeCardAction(address) {
    return (dispatch) => {
        userLikeCard(address)
            .then(response => {
                const data = response.data;
                console.log(`userLikeCard: ${JSON.stringify(data)}`);
                saveUserDataInLocalStorage(data);
                dispatch(confirmedFetchUserDataAction(data));
            })
            .catch(error => {
                console.log(error);
            });
    };
}

export function confirmedFetchUserDataAction(data) {
    return {
        type: FETCH_USER_DATA_CONFIRM_ACTION,
        payload: data
    };
}