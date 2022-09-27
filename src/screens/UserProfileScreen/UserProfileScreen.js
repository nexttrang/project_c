import React from 'react';
import CommonHeader from '../../components/Header/CommonHeader';
import UserProfileContainer from './UserProfileContainer';

import {
    WagmiConfig,
    createClient,
    defaultChains,
    configureChains,
} from 'wagmi';

import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';

import { ConnectKitProvider, ConnectKitButton, getDefaultClient } from 'connectkit';

const alchemyId = process.env.REACT_APP_ALCHEMY_ID;

const client = createClient(
    getDefaultClient({
        appName: 'Storica App',
        alchemyId,
    }),
);

const UserProfileScreen = (props) => {
    return (
        <>
            <CommonHeader backButton={'/home'} title={'PROFILE'} />
            <WagmiConfig client={client}>
                <ConnectKitProvider theme="midnight">
                    <UserProfileContainer />
                </ConnectKitProvider>
            </WagmiConfig>
        </>
    );
};

export default UserProfileScreen;