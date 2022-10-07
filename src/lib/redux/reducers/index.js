
import { combineReducers } from 'redux';
import { authReducer } from './AuthReducer';
import assetReducer from './AssetReducer';
import moralisReducer from './MoralisReducer';
import searchReducer from './SearchReducer';
import { userReducer } from './UserReducer';
import { appStateReducer } from './AppStateReducer';

const allReducers = combineReducers({
    auth: authReducer,
    user: userReducer,
    asset: assetReducer,
    moralis: moralisReducer,
    search: searchReducer,
    app: appStateReducer,
});
export default allReducers;