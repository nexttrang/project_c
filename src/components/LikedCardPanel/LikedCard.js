import { Box } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import defaultImage from '../../assets/images/ic_defaultimg.webp';
import { navigateToAssetInfo } from '../../lib/helper/navigator';
import { retrieveAsset } from '../../lib/services/openseaService';

const LikedCard = (props) => {
    const { address = '', tokenId = '', platform = '' } = props;

    const [asset, setAsset] = useState(null);
    const [imageUrl, setImageUrl] = useState(defaultImage);
    const [name, setName] = useState('');

    const navigate = useNavigate();

    const onClick = () => {
        navigateToAssetInfo(navigate, address, tokenId);
    };

    useEffect(() => {
        retrieveAsset(address, tokenId).then(response => {
            setAsset(response.data);
        }).catch(error => {
            console.log(error);
        });
    }, []);

    useEffect(() => {
        if (asset != null) {
            setImageUrl(asset.image_url);
            setName(asset.name);
        }
    }, [asset]);

    return (
        <Box
            className='box_likedcard'
            component="img"
            alt={name}
            src={imageUrl}
            onClick={onClick}
        />
    );
};

export default LikedCard;