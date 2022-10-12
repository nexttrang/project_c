import { Box, Button, ButtonBase, Container, Grid, Paper, Typography } from '@material-ui/core';
import { makeStyles, styled } from '@material-ui/styles';
import { Stack } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import CustomLongButton from '../../components/CustomLongButton';
import NFTCardPanel from '../../components/NFTCardPanel';
import NFTDes from '../../components/NFTDes';
import Spacer from '../../components/Spacer';
import StyledDiv from '../../components/StyledDiv';
import { retrieveCollectionInfo, getListedNftsByCollection } from '../../lib/services/magicedenService';
import './CollectionInfo.css';


const CollectionInfoContainer = () => {
    const { id } = useParams();
    const [collection, setCollection] = useState();
    const [nfts, setNFTs] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();

    const loadCollectionInfo = useCallback(() => {
        retrieveCollectionInfo(id).then(response => {
            const data = response.data;
            setCollection(data);
            console.log(`collection: ${JSON.stringify(data)}`);
        }).catch(error => {
            console.log(error);
        });
    }, []);

    const loadNFTs = useCallback(() => {
        getListedNftsByCollection(id, 0).then(response => {
            const data = response.data;
            setNFTs(data.results);
            console.log(`NFTs: ${JSON.stringify(data)}`);
        }).catch(error => {
            console.log(error);
        });
    }, []);

    useEffect(() => {
        loadCollectionInfo();
    }, [loadCollectionInfo]);

    useEffect(() => {
        loadNFTs();
    }, [loadNFTs]);

    const showNFTs = () => {
        return (
            <StyledDiv>
                <NFTCardPanel datas={nfts} />
            </StyledDiv>
        );
    };

    const showCollectionDes = () => {
        return (
            <NFTDes des={collection.description} />
        );
    };

    const onClickVisit = (e) => {
        e.preventDefault();
        // openEtherScan(payoutAddress);
        setSearchParams({ request: 'webpopup', host: 'magiceden', endpoint: `${collection.symbol}` });
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
                            src={collection.image}
                        />

                        {showCollectionDes()}
                        {/* {nfts && showNFTs()} */}
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
