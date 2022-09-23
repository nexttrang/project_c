import React from 'react';
import { Box, Button, Link } from '@material-ui/core';

import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { useAccount, useConnect, useDisconnect, useSignMessage } from 'wagmi';
import axios from 'axios';
import { connect, useDispatch } from 'react-redux';
import { importNativeBalanceAction, importSignatureAction, disconnectWalletAction } from '../../lib/redux/actions/MoralisAction';
import ShortButton from '../ShortButton';
import checker from '../../lib/helper/checker';
import { isMobile } from 'react-device-detect';

const dappUrl = 'king-prawn-app-jg2si.ondigitalocean.app';
const metamaskAppDeepLink = 'https://metamask.app.link/dapp/' + dappUrl;

const MetaMaskButton = (props) => {

    const dispatch = useDispatch();

    const { connectAsync } = useConnect();
    const { disconnectAsync } = useDisconnect();
    const { isConnected } = useAccount();
    const { signMessageAsync } = useSignMessage();

    const onConnectWallet = async (e) => {
        e.preventDefault();

        try {
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
        } catch (error) {
            if (checker.isConnectorNotFoundError(JSON.stringify(error))) {
                window.open(metamaskAppDeepLink, '_blank');
            }
        }
    };

    const onDisconnect = (e) => {
        e.preventDefault();
        dispatch(disconnectWalletAction());
    };

    const showConnect = () => {
        console.log(`showConnect: isMobile: ${isMobile}`);
        if (isMobile) {
            return (
                <a href={metamaskAppDeepLink}>
                    <button>
                        Connect to MetaMask
                    </button>
                </a >

            );
        }

        return (
            <ShortButton label={'CONNECT'} bgColor={'#007aff'} onClick={onConnectWallet} />
        );
    };

    return (
        <Box>
            {
                !props.signature ?
                    showConnect()
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