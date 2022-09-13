
import { combineReducers } from 'redux';
import { authReducer } from './AuthReducer';
import assetReducer from './AssetReducer';
import moralisReducer from './MoralisReducer';

const allReducers = combineReducers({
    auth: authReducer,
    asset: assetReducer,
    moralis: moralisReducer
});
export default allReducers;