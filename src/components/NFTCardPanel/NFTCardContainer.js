import { Container, } from '@material-ui/core';
import React from 'react';
import './NFTCardPanel.css';
import { Stack } from '@mui/material';
import getter from '../../lib/helper/getter';
import NFTCardRow from './NFTCardRow';

const NFTCardContainer = (props) => {
    const { datas } = props;

    const chunks = getter.chunksOfArray(datas, 2);

    return (
        <Container className='container_nftcardcontainer'>
            <Stack>
                {chunks.map((chunk, index) => (
                    <NFTCardRow key={index} datas={chunk} />
                )
                )}
            </Stack>
        </Container>
    );
};


export default NFTCardContainer;