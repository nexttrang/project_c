import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadingToggleAction, loginAction } from '../../lib/redux/actions/AuthActions';
import { Button } from '@mui/material';
import StyledDiv from '../../components/StyledDiv';
import { subscribeScreenAction } from '../../lib/redux/actions/AppStateAction';
import { ScreenName } from '../../App';

const StartScreen = (props) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(subscribeScreenAction(ScreenName.Start));
    }, []);

    const onStart = () => {
        dispatch(loadingToggleAction(true));
        dispatch(loginAction());
    };

    return (
        <StyledDiv style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Button style={{ backgroundColor: 'rgba(217, 217, 217, 0.1)', borderRadius: '10px', color: '#fff' }} onClick={onStart}>Start</Button>
        </StyledDiv>
    );
};

export default StartScreen;
