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

            {length >= 1 && <LikedCard address={data[0].address} tokenId={data[0].token_id} platform={data[0].platform} />}
            {length >= 2 && <LikedCard address={data[1].address} tokenId={data[1].token_id} platform={data[1].platform} />}

        </Grid>
    );
};

export default LikedCardRow;