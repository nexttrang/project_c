import { Grid } from '@material-ui/core';
import React from 'react';
import PropertyCard from '../PropertyCard';

const RowPropertyCard = (props) => {
    const { data } = props;

    const length = data.length;

    return (
        <Grid container
            spacing={0}
            direction="row"
            alignItems="center"
            justifyContent="space-around"
            style={{ margin: '1vh 0 1vh 0' }}>

            {length >= 1 && <PropertyCard trait_type={data[0].trait_type} value={data[0].value} percentage={data[0].percentage} />}
            {length >= 2 && <PropertyCard trait_type={data[1].trait_type} value={data[1].value} percentage={data[1].percentage} />}
            {length >= 3 && <PropertyCard trait_type={data[2].trait_type} value={data[2].value} percentage={data[2].percentage} />}

        </Grid>
    );
};

export default RowPropertyCard;