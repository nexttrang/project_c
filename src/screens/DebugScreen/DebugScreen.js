import React from 'react';
import { Grid } from '@material-ui/core';
import LongLabelChip from '../../components/LongLabelChip';
import LongButton from '../../components/LongButton/LongButton';

const DebugScreen = (props) => {

    return (
        <Grid container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '100vh' }}>
            <LongButton label={'Guest User'} />
            {/* <LongLabelChip label={'Address'} /> */}
        </Grid>
    );
};

export default DebugScreen;
