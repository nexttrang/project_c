import React, { useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useNavigate } from 'react-router-dom';
import defaultImage from '../../assets/images/ic_defaultimg.webp';
import getter from '../../lib/helper/getter';
import logger from '../../lib/helper/logger';
import { navigateToAssetInfo, navigateToCollectionInfo } from '../../lib/helper/navigator';
import { retrieveCollectionInfo } from '../../lib/services/magicedenService';
import { retrieveAsset } from '../../lib/services/openseaService';

const LikedCard = (props) => {
    const { data } = props;

    const platform = data[0];
    const id = data.length > 1 ? data[1] : '';
    const token_id = data.length > 2 ? data[2] : '';

    const [asset, setAsset] = useState(null);
    const [imageUrl, setImageUrl] = useState(defaultImage);
    const [name, setName] = useState('');

    const navigate = useNavigate();

    const onClick = () => {
        if (platform === 'opensea') {
            navigateToAssetInfo(navigate, id, token_id);
        } else if (platform === 'magiceden') {
            navigateToCollectionInfo(navigate, id);
        }

    };

    useEffect(() => {
        if (platform === 'opensea') {
            retrieveAsset(id, token_id).then(response => {
                setAsset(response.data);
            }).catch(error => {
                logger.log('LikedCard',`retrieveAsset error: ${error}`);
            });
        } else if (platform === 'magiceden') {
            retrieveCollectionInfo(id).then(response => {
                setAsset(response.data);
            }).catch(error => {
                logger.log('LikedCard',`retrieveCollectionInfo error: ${error}`);
            });
        }
    }, []);

    useEffect(() => {
        if (asset != null) {
            setImageUrl(getter.imageFromAsset(asset));
            setName(asset.name);
        }
    }, [asset]);

    return (
        <LazyLoadImage src={imageUrl} className='box_likedcard' onClick={onClick} />
    );
};

export default LikedCard;