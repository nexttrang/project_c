import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ScreenName } from '../../App';
import { subscribeScreenAction } from '../../lib/redux/actions/AppStateAction';
import HomeContainer from './HomeContainer';
import HomeHeader from './HomeHeader';

const HomeScreen = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(subscribeScreenAction(ScreenName.Home));
    }, []);

    return (
        <>
            <HomeHeader />
            <HomeContainer />
        </>
    );
};

export default HomeScreen;
