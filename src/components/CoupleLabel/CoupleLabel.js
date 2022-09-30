import React from 'react';
import './CoupleLabel.css';
import { Stack } from '@mui/material';

const CoupleLabel = (props) => {
    const { label, value, type = '1' } = props;

    return (
        <Stack direction='row' spacing={2} style={{ justifyContent: 'space-between', objectFit: 'contain', margin: '1vh 0 1vh 0' }}>
            <span className='label_couple_label'>
                {label}
            </span >
            <span className='value_couple_label' style={{ color: type === '1' ? '#36bfff' : '#fff' }}>
                {value}
            </span >
        </Stack>
    );
};

export default CoupleLabel;