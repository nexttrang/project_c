import { Box } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import defaultImage from '../../assets/images/ic_defaultimg.webp';
import './NFTCardPanel.css';

const NFTCard = (props) => {
    const { data } = props;
    const [imageUrl, setImageUrl] = useState(defaultImage);
    const [title, setTitle] = useState('');

    const navigate = useNavigate();

    const onClick = () => {
        // navigateToAssetInfo(navigate, address, tokenId);
    };

    useEffect(() => {
        if (data != null) {
            setImageUrl(data.img);
            setTitle(data.title);
        }
    }, [data]);

    return (
        <Box
            className='box_NFTcard'
            component="img"
            alt={title}
            src={imageUrl}
            onClick={onClick}
        />
    );
};

export default NFTCard;