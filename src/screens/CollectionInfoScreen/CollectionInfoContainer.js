import { Box, Container } from '@material-ui/core';
import { Stack } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { json, useParams, useSearchParams } from 'react-router-dom';
import CustomLongButton from '../../components/CustomLongButton';
import NFTDes from '../../components/NFTDes';
import StyledDiv from '../../components/StyledDiv';
import StyledLongButton from '../../components/StyledLongButton';
import getter from '../../lib/helper/getter';
import logger from '../../lib/helper/logger';
import AssetSelector from '../../lib/redux/selectors/AssetSelector';
import { retrieveCollectionInfo } from '../../lib/services/magicedenService';
import iconDescription from '../../assets/images/icon_description.webp';
import './CollectionInfo.css';


const CollectionInfoContainer = () => {
    const { id } = useParams();
    const [collection, setCollection] = useState();
    // const [nfts, setNFTs] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const localAsset = useSelector((state) => AssetSelector.magicedenAsset(state, id));

    const loadCollectionInfo = useCallback(() => {
        if (!localAsset) {
            retrieveCollectionInfo(id).then(response => {
                const data = response.data;
                setCollection(data);
                logger.log('CollectionInfo', `collection: ${JSON.stringify(data)}`);
            }).catch(error => {
                logger.log('CollectionInfo', `${error}`);
            });
        } else {
            logger.log('CollectionInfo', `local Asset: ${JSON.stringify(localAsset)}`);
            setCollection(localAsset);
        }
    }, []);

    useEffect(() => {
        loadCollectionInfo();
    }, [loadCollectionInfo]);

    const showCollectionDes = () => {
        return (
            <NFTDes des={collection.description} />
        );
    };

    const onClickVisit = (e) => {
        e.preventDefault();
        setSearchParams({ request: 'webpopup', host: 'magiceden', endpoint: `${getter.idFromAsset(collection)}` });
    };

    return (
        <StyledDiv>
            {collection &&
                <Container className='container_collection_info'>
                    <Stack spacing={2}>
                        <Box
                            className='card_header_collection_info'
                            component="img"
                            alt={collection.name}
                            src={getter.imageFromAsset(collection)}
                        />

                        <StyledLongButton icon={iconDescription} label={'Description'} type={'expand'} expandContent={showCollectionDes()} />
                    </Stack>
                    <StyledDiv matchParent={false} style={{ position: 'relative', top: '1vh', display: 'flex', justifyContent: 'center' }}>
                        <CustomLongButton label='VISIT' onClick={onClickVisit} />
                    </StyledDiv>
                </Container>
            }
        </StyledDiv>
    );
};

export default CollectionInfoContainer;
