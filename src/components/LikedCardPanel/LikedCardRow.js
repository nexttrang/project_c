import { Grid } from '@material-ui/core';
import React from 'react';
import LikedCard from './LikedCard';

const LikedCardRow = (props) => {
    const { data } = props;

    const length = data.length;

    return (
        <Grid container
            spacing={0}
            direction="row"
            alignItems="center"
            justifyContent="space-around"
            style={{ margin: '0.5vh 0 0.5vh 0' }}>

            {length >= 1 && <LikedCard data={data[0]} />}
            {length >= 2 && <LikedCard data={data[1]} />}

        </Grid>
    );
};

export default LikedCardRow;