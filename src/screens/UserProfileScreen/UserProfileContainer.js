import React, { useEffect } from 'react';
import { Avatar } from '@material-ui/core';
import { connect, useDispatch } from 'react-redux';
import { loadLocalNativeBalance, loadLocalSignature } from '../../lib/services/moralisService';
import './UserProfile.css';

import MetaMaskButton from '../../components/MeataMaskButton/MetaMaskButton';
import LongLabelChip from '../../components/LongLabelChip';
import LongButton from '../../components/LongButton/LongButton';
import { signInWithGoogle } from '../../lib/services/firebaseService';
import { Stack } from '@mui/material';
import { useParams, useSearchParams } from 'react-router-dom';
import { importNativeBalanceAction } from '../../lib/redux/actions/MoralisAction';

const UserProfileContainer = (props) => {
    const { auth, balance, address, signature } = props;
    const dispatch = useDispatch();
    let [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
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

const mapStateToProps = (state) => {
    return {
        balance: state.moralis.native_balance.balance,
        address: state.moralis.native_balance.address,
        signature: state.moralis.signature
    };
};

export default connect(mapStateToProps)(UserProfileContainer);