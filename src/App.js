import React, { Suspense, lazy, useEffect } from 'react';
import { Routes, Route, Navigate, HashRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AuthSelector from './lib/redux/selectors/AuthSelector';
import { checkAutoLogin } from './lib/services/authService';

const LoginScreen = lazy(() => import('./screens/LoginScreen'));
const RegisterScreen = lazy(() => import('./screens/RegisterScreen'));
const HomeScreen = lazy(() => import('./screens/HomeScreen'));
const AssetInfoScreen = lazy(() => import('./screens/AssetInfoScreen'));
const SettingScreen = lazy(() => import('./screens/SettingScreen'));
const UserProfileScreen = lazy(() => import('./screens/UserProfileScreen'));

const App = () => {

    const dispatch = useDispatch();
    const isAuthenticated = useSelector(AuthSelector.isAuthenticated);
    const auth = useSelector(AuthSelector.auth);

    const navigate = (pageTag) => {
        return isAuthenticated ? pageTag : <Navigate to="/" />;
    };

    useEffect(() => {
        checkAutoLogin(dispatch);
    }, []);

    return (
        <HashRouter>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route exact path="/" element={isAuthenticated ? (<Navigate to="/home" />) : (<Navigate to="/login" />)} />
                    <Route path="/home" element={navigate(<HomeScreen {...{ auth: auth }} />)} />
                    <Route exact path="/register" element={<RegisterScreen />} />
                    <Route exact path="/login" element={isAuthenticated ? (<Navigate to="/home" />) : (<LoginScreen />)} />
                    <Route exact path="/asset_info/:contactAddress/:tokenId" element={navigate(<AssetInfoScreen {...{ auth: auth }} />)} />
                    <Route exact path="/setting" element={navigate(<SettingScreen {...{ auth: auth }} />)} />
                    <Route exact path="/user_profile" element={navigate(<UserProfileScreen {...{ auth: auth }} />)} />
                </Routes>
            </Suspense>
        </HashRouter >
    );
};

export default App;
