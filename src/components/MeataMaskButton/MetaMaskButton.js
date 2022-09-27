import React, { useEffect } from 'react';
import { Box } from '@material-ui/core';

import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { useAccount, useConnect, useDisconnect, useEnsAvatar, useEnsName } from 'wagmi';
import { connect, useDispatch } from 'react-redux';
import { importNativeBalanceAction, disconnectWalletAction } from '../../lib/redux/actions/MoralisAction';
import ShortButton from '../ShortButton';
import checker from '../../lib/helper/checker';
import { isMobile } from 'react-device-detect';
import { useSearchParams } from 'react-router-dom';

const dappUrl = 'king-prawn-app-jg2si.ondigitalocean.app';
const metamaskAppDeepLink = 'https://metamask.app.link/dapp/' + dappUrl;

const MetaMaskButton = (props) => {
    const dispatch = useDispatch();

    const { connectAsync, connect, connectors, error, isLoading, pendingConnector } = useConnect();
    const { disconnectAsync, disconnect } = useDisconnect();
    const { isConnected, address, connector } = useAccount();
    const { data: ensAvatar } = useEnsAvatar({ addressOrName: address });
    const { data: ensName } = useEnsName({ address });

    const [searchParams, setSearchParams] = useSearchParams();

    // const onConnectWallet = async (e) => {
    //     e.preventDefault();

    //     try {
    //         if (isMobile) {
    //             setSearchParams({ device: 'mobile', request: 'metamaskconnect' });
    //         }

    //         if (isConnected) {
    //             await disconnectAsync();
    //         }

    //         const { account, chain } = await connectAsync({
    //             connector: new MetaMaskConnector()
    //         });

    //         dispatch(importNativeBalanceAction(account));
    //     } catch (error) {
    //         if (checker.isConnectorNotFoundError(JSON.stringify(error))) {
    //             console.log('Please install MetaMask!');
    //             window.open(metamaskAppDeepLink, '_blank');
    //         }
    //     }
    // };

    const onConnect = async (connector) => {
        try {
            connect(connector);
        } catch (error) {
            console.log(`connect error: ${JSON.stringify(error)}`);
        }
        // connectAsync(connector).then(result => {
        //     console.log(`connect result: ${JSON.stringify(result)}`);
        // }).catch(error => {

        // });
    };

    const onDisconnect = async (e) => {
        e.preventDefault();
        if (isConnected) {
            disconnectAsync().then(result => {
                dispatch(disconnectWalletAction());
            });
        }
    };

    useEffect(() => {
        if (!address) {
            dispatch(disconnectWalletAction());
            return;
        }

        dispatch(importNativeBalanceAction(address));
    }, [address]);

    const showConnectors = () => {
        return (
            <div>
                {connectors.map((connector) => (
                    <button
                        disabled={!connector.ready}
                        key={connector.id}
                        onClick={() => onConnect({ connector })}
                    >
                        {connector.name}
                        {!connector.ready && ' (unsupported)'}
                        {isLoading &&
                            connector.id === pendingConnector?.id &&
                            ' (connecting)'}
                    </button>
                ))}

                {error && <div>{error.message}</div>}
            </div>
        );

    };

    return (
        <Box>
            {
                !isConnected ?
                    showConnectors()
                    :
                    <ShortButton label={'DISCONNECT'} bgColor={'#007aff'} onClick={onDisconnect} />
            }
        </Box>
    );
};

// const mapStateToProps = (state) => {
//     return {
//         address: state.moralis.native_balance.address,
//     };
// };

export default MetaMaskButton;