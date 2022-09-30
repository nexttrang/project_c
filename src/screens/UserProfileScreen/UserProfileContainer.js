import React, { useEffect } from 'react';
import { Avatar } from '@material-ui/core';
import { connect, useDispatch } from 'react-redux';
import { loadLocalNativeBalance, loadLocalSignature } from '../../lib/services/moralisService';
import './UserProfile.css';
import { signInWithGoogle } from '../../lib/services/firebaseService';
import { Stack } from '@mui/material';
import { useParams, useSearchParams } from 'react-router-dom';
import { importNativeBalanceAction } from '../../lib/redux/actions/MoralisAction';
import { mappingGoogleAccountAction } from '../../lib/redux/actions/AuthActions';
import { ConnectKitButton } from 'connectkit';
import StyledLongButton from '../../components/StyledLongButton/StyledLongButton';

const UserProfileContainer = (props) => {
    const { auth, balance, address, signature } = props;
    const dispatch = useDispatch();
    let [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        console.log(`auth: ${JSON.stringify(auth)}`);
        dispatch(mappingGoogleAccountAction());

        const request = searchParams.get('request');
        console.log(`request: ${request}`);
        if (request === 'importaddress') {
            // console.log(`request: ${request}`);
            const value = searchParams.get('value');
            console.log(`value: ${value}`);
            dispatch(importNativeBalanceAction(value));
        }
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
            <>
                <span className="title_menu">
                    E-MAIL:
                </span>

                <StyledLongButton label={auth.email ? auth.email : `Guest User : ${auth.uid}`} onClick={!auth.email ? onMappingGoogle : (() => { })} type={!auth.email ? 'edit' : ''} />
            </>
        );
    };

    const showWallet = () => {
        return (
            <div style={{ marginTop: '1.5vh' }}>
                <span className="title_menu">
                    WALLET:
                </span>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.6vh' }}>
                    <ConnectKitButton />
                </div>
            </div>
        );
    };

    return (
        <div className='container'>
            <Stack>
                <Avatar
                    alt={auth.displayName}
                    src={auth.avatar}
                    style={{ width: '18.5vw', height: '18.5vw', margin: 'auto' }}
                />
                {showEmail()}
                {showWallet()}
            </Stack>
        </div>
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