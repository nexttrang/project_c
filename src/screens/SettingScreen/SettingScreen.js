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

const SettingScreen = () => {
    const dispatch = useDispatch();

    const onLogout = async (e) => {
        e.preventDefault();
        await auth.signOut();
        dispatch(logoutAction());
        dispatch(disconnectWalletAction());
    };

    const accountList = () => {
        return (
            <List
                sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        Account
                    </ListSubheader>
                }
            >
                <ListItemButton onClick={onLogout}>
                    <ListItemIcon>
                        <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                </ListItemButton>
            </List>
        );
    };

    const aboutList = () => {
        return (
            <List
                sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        About
                    </ListSubheader>
                }
            >
                <ListItemButton>
                    <ListItemIcon>
                        <GavelOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Terms of Service" />
                </ListItemButton>
                <ListItemButton>
                    <ListItemIcon>
                        <PolicyOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Privacy Policy" />
                </ListItemButton>
            </List>
        );
    };

    return (
        <>
            <CommonHeader backButton={'/home'} />
            <Container>
                {accountList()}
                {aboutList()}
            </Container>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        isAuthenticated: AuthSelector.isAuthenticated(state)
    };
};

export default connect(mapStateToProps)(SettingScreen);
