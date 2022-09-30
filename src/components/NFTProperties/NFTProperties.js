import { Grid } from '@material-ui/core';
import React from 'react';
import getter from '../../lib/helper/getter';
import RowPropertyCard from '../RowPropertyCard';

const NFTProperties = (props) => {
    const { data } = props;

    const chunks = getter.chunksOfArray(data, 3);

    return (
        <Grid container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '5vh' }}>

            {chunks.map((chunk, index) => (
                <RowPropertyCard key={index} data={chunk} />
            )
            )}
        </Grid>
    );
};

export default NFTProperties;