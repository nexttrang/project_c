import React, { useEffect } from 'react';
import { Avatar } from '@material-ui/core';
import { connect, useDispatch } from 'react-redux';
import { loadLocalNativeBalance, loadLocalSignature } from '../../lib/services/moralisService';
import './UserProfile.css';
import { signInWithGoogle } from '../../lib/services/firebaseService';
import { Stack } from '@mui/material';
import { mappingGoogleAccountAction } from '../../lib/redux/actions/AuthActions';
import { ConnectKitButton } from 'connectkit';
import StyledLongButton from '../../components/StyledLongButton/StyledLongButton';
import LikedCardPanel from '../../components/LikedCardPanel';
import StyledDiv from '../../components/StyledDiv';
import logger from '../../lib/helper/logger';

const UserProfileContainer = (props) => {
    const { auth, balance, address, signature } = props;
    const dispatch = useDispatch();

    useEffect(() => {
        logger.log('UserProfile', `auth: ${JSON.stringify(auth)}`);
        dispatch(mappingGoogleAccountAction());
    }, []);

    useEffect(() => {
        loadLocalSignature(dispatch);
        loadLocalNativeBalance(dispatch);
    }, [balance, address, signature]);

    const onMappingGoogle = () => {
        signInWithGoogle();
    };

    const showEmail = () => {
        return (
            <StyledDiv matchParent={false}>
                <span className="title_menu">
                    E-MAIL:
                </span>

                <StyledLongButton label={auth.email ? auth.email : `Guest User : ${auth.uid}`} onClick={!auth.email ? onMappingGoogle : (() => { })} type={!auth.email ? 'edit' : ''} />
            </StyledDiv>
        );
    };

    const showWallet = () => {
        return (
            <StyledDiv matchParent={false} style={{ marginTop: '1.5vh' }}>
                <span className="title_menu">
                    WALLET:
                </span>
                <StyledDiv matchParent={false} style={{ display: 'grid', justifyContent: 'center', marginTop: '1.6vh' }}>
                    <ConnectKitButton />
                </StyledDiv>
            </StyledDiv>
        );
    };

    const showLikedCardPanel = () => {
        return (
            <StyledDiv>
                <LikedCardPanel />
            </StyledDiv>
        );
    };

    return (
        <Stack className='container_user_profile_container'>
            <Avatar
                alt={auth.displayName}
                src={auth.avatar}
                style={{ width: '18.5vw', height: '18.5vw', margin: 'auto' }}
            />
            {showEmail()}
            {showWallet()}
            {showLikedCardPanel()}
        </Stack>
    );
};

const mapStateToProps = (state) => {
    return {
        balance: state.moralis.native_balance.balance,
        address: state.moralis.native_balance.address,
        signature: state.moralis.signature,
        auth: state.auth.auth
    };
};

export default connect(mapStateToProps)(UserProfileContainer);