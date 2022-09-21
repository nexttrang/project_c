import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Container } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import PolicyOutlinedIcon from '@mui/icons-material/PolicyOutlined';
import GavelOutlinedIcon from '@mui/icons-material/GavelOutlined';
import { connect, useDispatch } from 'react-redux';
import { logoutAction } from '../../lib/redux/actions/AuthActions';
import { disconnectWalletAction } from '../../lib/redux/actions/MoralisAction';
import AuthSelector from '../../lib/redux/selectors/AuthSelector';
import CommonHeader from '../../components/Header/CommonHeader';
import { auth } from '../../lib/services/firebaseService';
import './SettingScreen.css';
import LabelArrowLongButton from '../../components/LabelArrowLongButton';
import iconTerm from '../../assets/images/icon_term.webp';
import iconPrivacy from '../../assets/images/icon_privacy.webp';
import ShortButton from '../../components/ShortButton';

const SettingScreen = () => {
    const dispatch = useDispatch();

    const onLogout = async (e) => {
        e.preventDefault();
        await auth.signOut();
        dispatch(logoutAction());
        dispatch(disconnectWalletAction());
    };

    return (
        <>
            <CommonHeader backButton={'/home'} title={'MENU'} />
            <div className='container'>
                <span className="title_menu">
                    ABOUT
                </span>

                <LabelArrowLongButton icon={iconTerm} label={'Term Of Service'} />
                <LabelArrowLongButton icon={iconPrivacy} label={'Privacy Policy'} />

                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.6vh' }}>
                    <ShortButton label={'LOGOUT'} onClick={onLogout} />
                </div>
            </div>

        </>
    );
};

const mapStateToProps = (state) => {
    return {
        isAuthenticated: AuthSelector.isAuthenticated(state)
    };
};

export default connect(mapStateToProps)(SettingScreen);
