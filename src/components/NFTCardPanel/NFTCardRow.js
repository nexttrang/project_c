import { Grid } from '@material-ui/core';
import React from 'react';
import NFTCard from './NFTCard';

const NFTCardRow = (props) => {
    const { datas } = props;

    const length = datas.length;

    return (
        <Grid container
            spacing={0}
            direction="row"
            alignItems="center"
            justifyContent="space-around"
            style={{ margin: '0.5vh 0 0.5vh 0' }}>

            {length >= 1 && <NFTCard data={datas[0]} />}
            {length >= 2 && <NFTCard data={datas[1]} />}

        </Grid>
    );
};

export default NFTCardRow;