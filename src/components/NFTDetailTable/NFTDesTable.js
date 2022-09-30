import React from 'react';
import { Stack } from '@mui/material';
import CoupleLabel from '../CoupleLabel';

const NFTDetailTable = (props) => {
    const { contractAddress, contractId, contractStandard } = props;

    return (
        <Stack spacing={3} style={{ padding: '10px 0 10px 0' }}>
            <CoupleLabel label='Contract Address:' value={contractAddress} />
            <CoupleLabel label='Contract ID:' value={contractId} />
            <CoupleLabel label='Contract Standard:' value={contractStandard} type='2' />
        </Stack>
    );
};

export default NFTDetailTable;