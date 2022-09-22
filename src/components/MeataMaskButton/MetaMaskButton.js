import React from 'react';
import { Box } from '@material-ui/core';
import { useSearchParams } from 'react-router-dom';

import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { useAccount, useConnect, useDisconnect, useSignMessage } from 'wagmi';
import axios from 'axios';
import { connect, useDispatch } from 'react-redux';
import { importNativeBalanceAction, importSignatureAction, disconnectWalletAction } from '../../lib/redux/actions/MoralisAction';
import ShortButton from '../ShortButton';
import checker from '../../lib/helper/checker';
import { isMobile } from 'react-device-detect';

const MetaMaskButton = (props) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const dispatch = useDispatch();

    const { connectAsync } = useConnect();
    const { disconnectAsync } = useDisconnect();
    const { isConnected } = useAccount();
    const { signMessageAsync } = useSignMessage();

    const queryConnectWalletForMobile = () => {
        setSearchParams({ 'device': 'mobile', 'request': 'connect_wallet' });
        // const currentURL = window.location.pathname;
        // navigateSearch(currentURL, { device: 'mobile', request: 'connect_wallet' });
    };

    const onConnectWallet = async (e) => {
        e.preventDefault();

        try {
            if (isMobile) {
                queryConnectWalletForMobile();
            }

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
                window.open('https://metamask.io/download/', '_blank');
            }
        }

    };

    const onDisconnect = (e) => {
        e.preventDefault();
        dispatch(disconnectWalletAction());
    };

    return (
        <Box>
            {
                !props.signature ?
                    <ShortButton label={'CONNECT'} bgColor={'#007aff'} onClick={onConnectWallet} />
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