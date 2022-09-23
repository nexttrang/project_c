import React, { useEffect, useState } from 'react';
import { Box, Button } from '@material-ui/core';

import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { useAccount, useConnect, useDisconnect, useSignMessage } from 'wagmi';
import axios from 'axios';
import { connect, useDispatch } from 'react-redux';
import { importNativeBalanceAction, importSignatureAction, disconnectWalletAction } from '../../lib/redux/actions/MoralisAction';
import ShortButton from '../ShortButton';
import { ethers } from 'ethers';

const MetaMaskButton = (props) => {

    const dispatch = useDispatch();

    const { connectAsync } = useConnect();
    const { disconnectAsync } = useDisconnect();
    const { isConnected } = useAccount();
    const { signMessageAsync } = useSignMessage();

    const [errorMessage, setErrorMessage] = useState(null);
    const [account, setAccount] = useState(null);
    const [balance, setBalance] = useState(null);

    useEffect(() => {
        if (window.ethereum) {
            window.ethereum.on('accountsChanged', accountsChanged);
            window.ethereum.on('chainChanged', chainChanged);
        }
    }, []);

    const connectHandler = async () => {
        if (window.ethereum) {
            try {
                const res = await window.ethereum.request({
                    method: 'eth_requestAccounts',
                });
                await accountsChanged(res[0]);
            } catch (err) {
                console.error(err);
                setErrorMessage('There was a problem connecting to MetaMask');
            }
        } else {
            setErrorMessage('Install MetaMask');
        }
    };

    const accountsChanged = async (newAccount) => {
        setAccount(newAccount);
        console.log(`account: ${newAccount}`);

        try {
            dispatch(importNativeBalanceAction(account));
        } catch (err) {
            console.error(err);
            setErrorMessage('There was a problem connecting to MetaMask');
        }

    };

    const chainChanged = () => {
        setErrorMessage(null);
        setAccount(null);
        setBalance(null);
    };

    const onConnectWallet = async (e) => {
        e.preventDefault();

        if (isConnected) {
            await disconnectAsync();
        }

        const { account, chain } = await connectAsync({
            connector: new MetaMaskConnector()
        });

        const userData = {
            data: {
                address: account,
                chain: chain.id,
            }
        };

        console.log(userData);

        const { data } = await axios.post(
            'https://us-central1-tinderclone-ece49.cloudfunctions.net/v1/user/request_message',
            userData,
            {
                headers: {
                    'content-type': 'application/json',
                },
            }
        );

        console.log(`Received Message From Moralis: ${data}`);

        const message = data.message;
        const signature = await signMessageAsync({ message });

        const verification = {
            data: {
                message: message,
                signature: signature,
            }
        };

        console.log(`verification ${JSON.stringify(verification)}`);
        dispatch(importSignatureAction(signature));
        dispatch(importNativeBalanceAction(account));
    };

    const onDisconnect = (e) => {
        e.preventDefault();
        dispatch(disconnectWalletAction());
    };

    return (
        <Box>
            {
                !props.signature ?
                    <ShortButton label={'CONNECT'} bgColor={'#007aff'} onClick={connectHandler} />
                    :
                    <ShortButton label={'DISCONNECT'} bgColor={'#007aff'} onClick={onDisconnect} />
            }
        </Box>
    );
};

const mapStateToProps = (state) => {
    return {
        signature: state.moralis.signature
    };
};

export default connect(mapStateToProps)(MetaMaskButton);