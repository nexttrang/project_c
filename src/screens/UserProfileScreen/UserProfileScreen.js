import React from 'react';
import CommonHeader from '../../components/Header/CommonHeader';
import UserProfileContainer from './UserProfileContainer';

import {
    WagmiConfig,
    createClient,
} from 'wagmi';

import { ConnectKitProvider, getDefaultClient } from 'connectkit';

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