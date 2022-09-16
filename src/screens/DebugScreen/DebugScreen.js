import React from 'react';
import CircleButton from '../../components/CircleButton/CircleButton';
import { Grid } from '@material-ui/core';

const DebugScreen = (props) => {

    return (
        <Grid container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '100vh' }}>
            <CircleButton />
        </Grid>
    );
};

export default DebugScreen;
