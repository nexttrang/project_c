import React, { useEffect, useState } from 'react';
import { Box, Button, Link } from '@material-ui/core';

import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { useAccount, useConnect, useDisconnect, useSignMessage } from 'wagmi';
import axios from 'axios';
import { connect, useDispatch } from 'react-redux';
import { importNativeBalanceAction, importSignatureAction, disconnectWalletAction } from '../../lib/redux/actions/MoralisAction';
import ShortButton from '../ShortButton';
import checker from '../../lib/helper/checker';
import { isMobile } from 'react-device-detect';
import { disconnect } from '@wagmi/core';

const dappUrl = 'localhost:3000';//king-prawn-app-jg2si.ondigitalocean.app';
const metamaskAppDeepLink = 'https://metamask.app.link/dapp/' + dappUrl;

const MetaMaskButton = (props) => {
    const { balance, address, signature } = props;
    const dispatch = useDispatch();

    const { connectAsync } = useConnect();
    const { disconnectAsync } = useDisconnect();
    const { isConnected } = useAccount();
    const { signMessageAsync } = useSignMessage();

    // const [userAddress, setUserAddress] = useState('');

    const onDisconnect = (e) => {
        e.preventDefault();
        dispatch(disconnectWalletAction());
    };

    async function connect() {
        if (window.ethereum) {
            handleEthereum();
        } else {
            alert('Get MetaMask!');
            window.addEventListener('ethereum#initialized', handleEthereum, {
                once: true,
            });

            // If the event is not dispatched by the end of the timeout,
            // the user probably doesn't have MetaMask installed.
            setTimeout(handleEthereum, 3000); // 3 seconds
        }
    }

    async function handleEthereum() {
        const { ethereum } = window;
        if (ethereum && ethereum.isMetaMask) {
            console.log('Ethereum successfully detected!');
            // Access the decentralized web!
            const accounts = await window.ethereum.request({
                method: 'eth_requestAccounts',
            });
        } else {
            console.log('Please install MetaMask!');
            window.open(metamaskAppDeepLink, '_blank');
        }
    }

    async function checkIfWalletIsConnected() {
        if (window.ethereum) {
            const accounts = await window.ethereum.request({
                method: 'eth_accounts',
            });

            if (accounts.length > 0) {
                dispatch(importNativeBalanceAction(accounts[0]));
                return;
            }

            // if (isMobile) {
            //     await connect();
            // }
        }
    }

    const accountsChanged = (accounts) => {
        console.log(`accountsChanged: ${accounts[0]}`);
        if (accounts.length > 0) {
            dispatch(importNativeBalanceAction(accounts[0]));
        }
        else {
            dispatch(disconnectWalletAction());
        }
    };

    const handleChainChanged = (_chainId) => {
        console.log(`handleChainChanged: ${_chainId}`);
    };

    window.ethereum.on('accountsChanged', accountsChanged);
    window.ethereum.on('disconnect', (error) => {
        console.log(`disconnect: ${JSON.stringify(error)}`);
    });
    window.ethereum.on('chainChanged', handleChainChanged);

    useEffect(() => {
        checkIfWalletIsConnected();
    }, []);

    const showConnectButton = () => {
        console.log(`showConnect: isMobile: ${isMobile}`);
        if (isMobile) {
            return (
                <a href={metamaskAppDeepLink}>
                    <ShortButton label={'CONNECT'} bgColor={'#007aff'} />
                </a >
            );
        }

        return (
            <ShortButton label={'CONNECT'} bgColor={'#007aff'} onClick={connect} />
        );
    };

    return (
        <Box>
            {
                !address ?
                    showConnectButton()
                    :
                    <ShortButton label={'DISCONNECT'} bgColor={'#007aff'} onClick={onDisconnect} />
            }
        </Box>
    );
};

const mapStateToProps = (state) => {
    return {
        signature: state.moralis.signature,
        balance: state.moralis.native_balance.balance,
        address: state.moralis.native_balance.address,
    };
};

export default connect(mapStateToProps)(MetaMaskButton);