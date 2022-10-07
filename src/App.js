import React, { Suspense, lazy, useEffect } from 'react';
import { Routes, Route, Navigate, HashRouter } from 'react-router-dom';
import { connect, useDispatch, useSelector } from 'react-redux';
import AuthSelector from './lib/redux/selectors/AuthSelector';
import { checkAutoLogin } from './lib/services/authService';
import './styles/App.css';
import DebugScreen from './screens/DebugScreen/DebugScreen';
import { mappingGoogleAccountAction } from './lib/redux/actions/AuthActions';
import { createTheme, ThemeProvider } from '@material-ui/core';
import CrawlingScreen from './screens/CrawlingScreen/CrawlingScreen';
import { style } from '@mui/system';
import Loader from './components/Loader/Loader';
import { unsubscribeScreenAction } from './lib/redux/actions/AppStateAction';

const StartScreen = lazy(() => import('./screens/StartScreen'));
const HomeScreen = lazy(() => import('./screens/HomeScreen'));
const AssetInfoScreen = lazy(() => import('./screens/AssetInfoScreen'));
const SettingScreen = lazy(() => import('./screens/SettingScreen'));
const UserProfileScreen = lazy(() => import('./screens/UserProfileScreen'));

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#1976d2',
        },
    },
});

export const ScreenName = {
    Start: 'Start',
    Home: 'Home',
    AssetInfo: 'AssetInfo',
    Setting: 'Setting',
    UserProfile: 'UserProfile'
};

const nameToScreen = {
    Start: <StartScreen />,
    Home: <HomeScreen />,
    AssetInfo: <AssetInfoScreen />,
    Setting: <SettingScreen />,
    UserProfile: <UserProfileScreen />
};

const App = (props) => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(AuthSelector.isAuthenticated);

    const navigate = (screenName) => {
        console.log(`navigate: ${screenName}`);

        return isAuthenticated ? nameToScreen[screenName] : <Navigate to="/" />;
    };

    useEffect(() => {
        checkAutoLogin(dispatch);
        dispatch(mappingGoogleAccountAction());
    }, []);

    return (
        <ThemeProvider theme={darkTheme}>
            <HashRouter>
                <Suspense fallback={<Loader type='suspense' />}>
                    <Routes>
                        <Route exact path="/" element={isAuthenticated ? (<Navigate to="/home" />) : (<Navigate to="/start" />)} />
                        <Route path="/home" element={navigate(ScreenName.Home)} />
                        <Route exact path="/start" element={isAuthenticated ? (<Navigate to="/home" />) : (<StartScreen />)} />
                        <Route exact path="/asset_info/:contactAddress/:tokenId" element={navigate(ScreenName.AssetInfo)} />
                        <Route exact path="/setting" element={navigate(ScreenName.Setting)} />
                        <Route exact path="/user_profile" element={navigate(ScreenName.UserProfile)} />
                        <Route exact path="/debug" element={<DebugScreen />} />
                        <Route exact path="/crawling" element={<CrawlingScreen />} />
                    </Routes>
                </Suspense>
            </HashRouter >
            <Loader />
        </ThemeProvider >
    );
};

export default App;
