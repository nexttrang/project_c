import React from 'react';
import './NFTCollectionInfo.css';
import ic_etherscan from '../../assets/images/ic_etherscan.webp';
import { Stack } from '@mui/material';
import { openEtherScan } from '../../lib/services/openseaService';

const NFTCollectionInfo = (props) => {
    const { info, image, payout_address } = props;

    const onOpenEtherScan = (e) => {
        e.preventDefault();
        openEtherScan(payout_address);
    };

    return (
        <Stack style={{ minHeight: '5vh', margin: '1vh 0 1vh 0', alignItems: 'end' }} >
            <div style={{ width: '85vw' }}>
                {image && <img src={image} className='nft_col_info_image' />}
                <span className="nft_col_info_text">
                    {info}
                </span>
            </div>
            {payout_address && <img src={ic_etherscan} className='nft_col_info_ic_ether_scan' onClick={onOpenEtherScan} />}
        </Stack >
    );
};

export default NFTCollectionInfo;