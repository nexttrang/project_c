import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ScreenName } from '../../App';
import CommonHeader from '../../components/Header/CommonHeader';
import { subscribeScreenAction } from '../../lib/redux/actions/AppStateAction';
import AssetInfoContainer from './AssetInfoContainer';

const AssetInfoScreen = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(subscribeScreenAction(ScreenName.AssetInfo));
    }, []);

    return (
        <>
            <CommonHeader backButton={'/home'} title={'INFORMATION'} />
            <AssetInfoContainer />
        </>
    );
};

export default AssetInfoScreen;
