import React, { useEffect } from 'react';
import { Button, Container, Stack } from '@mui/material';
import { Avatar, Box, Divider, Typography } from '@material-ui/core';
import { connect, useDispatch } from 'react-redux';
import { loadLocalNativeBalance, loadLocalSignature } from '../../lib/services/moralisService';
import { makeStyles } from '@material-ui/styles';
import './UserProfile.css';

import MetaMaskButton from '../../components/MeataMaskButton/MetaMaskButton';
import { mappingGoogleAccountAction } from '../../lib/redux/actions/AuthActions';
import LongLabelChip from '../../components/LongLabelChip';
import ShortButton from '../../components/ShortButton';
import LongButton from '../../components/LongButton/LongButton';
import { signInWithGoogle } from '../../lib/services/firebaseService';

const UserProfileContainer = (props) => {
    const { auth, balance, address, signature } = props;

    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        loadLocalSignature(dispatch);
        loadLocalNativeBalance(dispatch);
    }, [balance, address, signature]);

    const onMappingGoogle = () => {
        signInWithGoogle();
        // dispatch(mappingGoogleAccountAction());
    };

    const showEmail = () => {
        return (
            <>
                <span className="title_menu">
                    E-MAIL:
                </span>

                <LongButton label={auth.email ? auth.email : `Guest User: ${auth.uid}`} onClick={!auth.email ? onMappingGoogle : (() => { })} editable={!auth.email} />
            </>
        );
    };

    const showWallet = () => {
        return (
            <div style={{ marginTop: '1.5vh' }}>
                <span className="title_menu">
                    WALLET:
                </span>

                <LongLabelChip label={'Address'} value={`${address}`} />
                <LongLabelChip label={'Balance'} value={`${balance}`} />
                <LongLabelChip label={'Signature'} value={`${signature}`} />

                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.6vh' }}>
                    <MetaMaskButton />
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

const useStyles = makeStyles({
    infoContainer: {
        marginTop: 15,
        marginBottom: 15,
    },
    walletContainer: {
        width: 500,
        maxWidth: '100%',
        marginTop: 15
    },
    content: {
        marginTop: 10,
        marginLeft: 15,
    },
    title: {
        textDecorationLine: 'underline',
    }
});

const mapStateToProps = (state) => {
    return {
        balance: state.moralis.native_balance.balance,
        address: state.moralis.native_balance.address,
        signature: state.moralis.signature
    };
};

export default connect(mapStateToProps)(UserProfileContainer);