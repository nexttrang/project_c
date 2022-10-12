import { Box, Button, ButtonBase, Container, Grid, Paper, Typography } from '@material-ui/core';
import { makeStyles, styled } from '@material-ui/styles';
import { Stack } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import CustomLongButton from '../../components/CustomLongButton';
import Spacer from '../../components/Spacer';
import StyledDiv from '../../components/StyledDiv';
import getter from '../../lib/helper/getter';
import { openEtherScan, retrieveAsset, retrieveCollection } from '../../lib/services/openseaService';
import './AssetInfo.css';
import AssetInfoCollapse from './AssetInfoCollapse';

const AssetInfoContainer = () => {
    const { contactAddress, tokenId } = useParams();
    const [asset, setAsset] = useState();
    const [traits, setTraits] = useState([]);
    const [slug, setSlug] = useState('');
    const [collectionInfo, setCollectionInfo] = useState();
    const [payoutAddress, setPayoutAddress] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();


    const getCalculatedTraits = () => {
        const statsCount = collectionInfo.stats.count;
        // console.log(`statsCount: ${statsCount}`);

        const validTraits = traits.filter(trait => { return typeof trait.value === 'string'; });

        return validTraits.map(trait => {
            let percentage = 0;

            const trait_type = collectionInfo.traits[`${trait.trait_type}`];
            if (trait_type) {
                const traitCount = trait_type[`${trait.value.toLowerCase()}`];
                if (traitCount) {
                    percentage = (traitCount * 100 / statsCount).toFixed(2);
                }
            }

            return { ...trait, percentage: percentage };
        });
    };

    const onClickVisit = (e) => {
        e.preventDefault();
        // openEtherScan(payoutAddress);
        setSearchParams({ request: 'webpopup', host: 'opensea', endpoint: `${asset.asset_contract.address}/${asset.token_id}` });
    };

    const loadAssetInfo = useCallback(() => {
        retrieveAsset(contactAddress, tokenId).then(response => {
            setAsset(response.data);
            // console.log(`loadAssetInfo : ${JSON.stringify(response)}`);
        }).catch(error => {
            console.log(error);
        });
    }, []);

    const loadCollectionInfo = useCallback(() => {
        if (!slug) return;
        console.log(`slug: ${slug}`);
        retrieveCollection(slug).then(response => {
            setCollectionInfo(response.data.collection);
            // console.log(`loadCollectionInfo: ${JSON.stringify(response)}`);
        }).catch(error => {
            console.log(error);
        });
    }, [slug]);

    useEffect(() => {
        loadAssetInfo(contactAddress, tokenId);
    }, [loadAssetInfo]);

    useEffect(() => {
        if (!asset) return;

        setTraits(asset.traits);
        setSlug(asset.collection.slug);
        setPayoutAddress(asset.asset_contract.payout_address);
    }, [asset]);

    useEffect(() => {
        loadCollectionInfo();
    }, [loadCollectionInfo]);

    useEffect(() => {
        if (!collectionInfo) return;
        setTraits(getCalculatedTraits());
    }, [collectionInfo]);

    return (
        <StyledDiv>
            {asset &&
                <Container className='container_asset_info'>
                    <Stack spacing={2}>
                        <Box
                            className='card_header_asset_info'
                            component="img"
                            alt={asset.name}
                            src={asset.image_url}
                        />
                        <AssetInfoCollapse asset={asset} tokenId={tokenId} traits={traits} />
                    </Stack>
                    <Spacer height='10vh' />
                    <StyledDiv matchParent={false} style={{ position: 'relative', top: '1vh', display: 'flex', justifyContent: 'center' }}>
                        <CustomLongButton label='VISIT' onClick={onClickVisit} />
                    </StyledDiv>
                </Container>
            }

        </StyledDiv>
    );
};

export default AssetInfoContainer;
