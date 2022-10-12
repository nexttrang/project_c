import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ScreenName } from '../../App';
import CommonHeader from '../../components/Header/CommonHeader';
import { subscribeScreenAction } from '../../lib/redux/actions/AppStateAction';
import CollectionInfoContainer from './CollectionInfoContainer';

const CollectionInfoScreen = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(subscribeScreenAction(ScreenName.CollectionInfo));
    }, []);

    return (
        <>
            <CommonHeader backButton={'/home'} title={'INFORMATION'} />
            <CollectionInfoContainer />
        </>
    );
};

export default CollectionInfoScreen;
