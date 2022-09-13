import React from 'react';
import { Box, Button } from '@material-ui/core';

import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { useAccount, useConnect, useDisconnect, useSignMessage } from 'wagmi';
import axios from 'axios';
import { connect, useDispatch } from 'react-redux';
import { importNativeBalanceAction, importSignatureAction, disconnectWalletAction } from '../../lib/redux/actions/MoralisAction';

const MetaMaskButton = (props) => {

    const dispatch = useDispatch();

    const { connectAsync } = useConnect();
    const { disconnectAsync } = useDisconnect();
    const { isConnected } = useAccount();
    const { signMessageAsync } = useSignMessage();

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

    const onSignout = (e) => {
        e.preventDefault();
        dispatch(disconnectWalletAction());
    };

    return (
        <Box>
            {
                !props.signature ?
                    <Button style={{ marginTop: 15 }} variant="contained" onClick={onConnectWallet}>
                        Connect
                    </Button>
                    :
                    <Button style={{ marginTop: 15 }} variant="contained" onClick={onSignout}>
                        Disconnect
                    </Button>
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