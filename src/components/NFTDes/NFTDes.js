import { Stack } from '@mui/material';
import React from 'react';
import './NFTDes.css';

const NFTDes = (props) => {
    const { by, des } = props;

    return (
        <Stack style={{ margin: '1vh 0 1vh 0', minHeight: '5vh' }} spacing={0.5} >
            <span className="nft_des_text">
                By
                <span className="text-style-1"> {by ? by : '#UNKNOWNUSER'}</span>
            </span>
            <span className="nft_des_text">
                {des}
            </span>
        </Stack>

    );
};

export default NFTDes;