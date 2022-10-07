import * as React from 'react';
import { connect, useDispatch } from 'react-redux';
import { logoutAction } from '../../lib/redux/actions/AuthActions';
import { disconnectWalletAction } from '../../lib/redux/actions/MoralisAction';
import AuthSelector from '../../lib/redux/selectors/AuthSelector';
import CommonHeader from '../../components/Header/CommonHeader';
import { auth } from '../../lib/services/firebaseService';
import './SettingScreen.css';
import iconTerm from '../../assets/images/icon_term.webp';
import iconPrivacy from '../../assets/images/icon_privacy.webp';
import ShortButton from '../../components/ShortButton';
import StyledLongButton from '../../components/StyledLongButton';
import StyledDiv from '../../components/StyledDiv';
import { subscribeScreenAction } from '../../lib/redux/actions/AppStateAction';
import { ScreenName } from '../../App';

const SettingScreen = () => {
    const dispatch = useDispatch();

    const onLogout = async (e) => {
        e.preventDefault();
        await auth.signOut();
        dispatch(logoutAction());
        dispatch(disconnectWalletAction());
    };

    React.useEffect(()=>{
        dispatch(subscribeScreenAction(ScreenName.Setting));
    },[]);

    return (
        <>
            <CommonHeader backButton={'/home'} title={'MENU'} />
            <StyledDiv matchParent={false} style={{ margin: '0 4.5vw 0 4.5vw' }}>
                <span className="title_menu">
                    ABOUT
                </span>

                <StyledLongButton icon={iconTerm} label={'Term Of Service'} />
                <StyledLongButton icon={iconPrivacy} label={'Privacy Policy'} />

                <StyledDiv matchParent={false} style={{ display: 'flex', justifyContent: 'center', marginTop: '1.6vh' }}>
                    <ShortButton label={'LOGOUT'} onClick={onLogout} />
                </StyledDiv>
            </StyledDiv>

        </>
    );
};

const mapStateToProps = (state) => {
    return {
        isAuthenticated: AuthSelector.isAuthenticated(state)
    };
};

export default connect(mapStateToProps)(SettingScreen);
