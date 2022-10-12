import React, { useEffect } from 'react';
import CommonHeader from '../../components/Header/CommonHeader';
import UserProfileContainer from './UserProfileContainer';

import {
    WagmiConfig,
    createClient,
} from 'wagmi';

import { ConnectKitProvider, getDefaultClient } from 'connectkit';
import StyledDiv from '../../components/StyledDiv';
import { useDispatch } from 'react-redux';
import { subscribeScreenAction } from '../../lib/redux/actions/AppStateAction';
import { ScreenName } from '../../App';

const alchemyId = process.env.REACT_APP_ALCHEMY_ID;

const client = createClient(
    getDefaultClient({
        appName: 'Storica App',
        alchemyId,
    }),
);

const UserProfileScreen = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(subscribeScreenAction(ScreenName.UserProfile));
    }, []);

    return (
        <StyledDiv>
            <CommonHeader backButton={'/home'} title={'PROFILE'} />
            <StyledDiv>
                <WagmiConfig client={client}>
                    <ConnectKitProvider theme="midnight" customTheme={{
                        '--ck-connectbutton-background': '#007aff',
                        '--ck-connectbutton-color': '#fff',
                        '--ck-connectbutton-border-radius': '20px',
                        '--ck-font-family': 'SFPro',
                        '--ck-connectbutton-font-size': '0.874em',
                    }}>
                        <UserProfileContainer />
                    </ConnectKitProvider>
                </WagmiConfig>
            </StyledDiv>
        </StyledDiv>
    );
};

export default UserProfileScreen;