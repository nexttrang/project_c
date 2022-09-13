import { Box, Button, ButtonBase, Container, Grid, Paper, Typography } from '@material-ui/core';
import { makeStyles, styled } from '@material-ui/styles';
import { Stack } from '@mui/material';
import { collection } from 'firebase/firestore/lite';
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CommonHeader from '../../components/Header/CommonHeader';
import getter from '../../lib/helper/getter';
import { openEtherScan, retrieveAsset, retrieveCollection } from '../../lib/services/openseaService';

const AssetInfoScreen = () => {

    const classes = useStyles();
    const { contactAddress, tokenId } = useParams();
    const [asset, setAsset] = useState();
    const [traits, setTraits] = useState([]);
    const [collectionName, setCollectionName] = useState('');
    const [colImgUrl, setColImgUrl] = useState('');
    const [colDescription, setColDescription] = useState('');
    const [description, setDescription] = useState('');
    const [assetContractAddress, setAssetContractAddress] = useState('');
    const [tokenStandard, setTokenStandard] = useState('');
    const [blockchain, setBlockchain] = useState('');
    const [slug, setSlug] = useState('');
    const [collectionInfo, setCollectionInfo] = useState();


    const onOpenEtherScan = (e) => {
        e.preventDefault();
        openEtherScan(asset.collection.payout_address);
    };

    const loadAssetInfo = useCallback(() => {
        retrieveAsset(contactAddress, tokenId).then(response => {
            setAsset(response.data);
            // console.log(JSON.stringify(response));
        }).catch(error => {
            console.log(error);
        });
    }, []);

    const loadCollectionInfo = useCallback(() => {
        if (!slug) return;

        retrieveCollection(slug).then(response => {
            setCollectionInfo(response.data.collection);
            console.log(JSON.stringify(response));
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
        setCollectionName(asset.collection.name);
        setColImgUrl(asset.collection.image_url);
        setColDescription(asset.collection.description);
        setDescription(asset.description);
        setAssetContractAddress(asset.asset_contract.address);

        const blockchainInfo = getter.getBlockchainInfo(asset.asset_contract.schema_name);
        setTokenStandard(blockchainInfo.token_standard);
        setBlockchain(blockchainInfo.blockchain);

        setSlug(asset.collection.slug);
    }, [asset]);

    useEffect(() => {
        loadCollectionInfo();
    }, [loadCollectionInfo]);

    useEffect(() => {
        if (!collectionInfo) return;

        const statsCount = collectionInfo.stats.count;
        console.log(`statsCount: ${statsCount}`);

        const calculatedTraits = traits.map(trait => {
            const traitCount = collectionInfo.traits[`${trait.trait_type}`][`${trait.value.toLowerCase()}`];
            const percentage = (traitCount * 100 / statsCount).toFixed(2);
            return { ...trait, percentage: percentage };
        });

        setTraits(calculatedTraits);
    }, [collectionInfo]);

    const showDescription = () => {
        return (
            <>
                <Typography variant="h5">Description</Typography>
                {description
                    ? < Typography >{description}</Typography>
                    : < Typography >---</Typography>
                }
            </>
        );
    };

    const showTraits = () => {
        return (
            <>
                <Typography variant="h5">Properties</Typography>
                {traits.length > 0
                    ? traits.map((trait, index) => {
                        return (
                            <Box key={index}>
                                <Typography>{trait.trait_type}</Typography>
                                <Typography>{trait.value}</Typography>
                                {trait.percentage && <Typography>{trait.percentage}%</Typography>}
                            </Box>
                        );
                    })
                    : <Typography>---</Typography>
                }

            </>
        );
    };

    const showCollectionInfo = () => {
        return (
            <>
                <Typography variant="h5">About {collectionName}</Typography>
                <Paper
                    sx={{
                        p: 2,
                        margin: 'auto',
                        maxWidth: 500,
                        flexGrow: 1,
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                    }}
                >
                    <Grid container spacing={2}>
                        <Grid item>
                            <ButtonBase sx={{ width: 128, height: 128 }}>
                                <Img alt="complex" src={colImgUrl} />
                            </ButtonBase>
                        </Grid>
                        <Grid item xs={12} sm container>
                            <Grid item xs container direction="column" spacing={2}>
                                <Grid item xs>
                                    <Typography variant="body2" gutterBottom>
                                        {colDescription}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Button onClick={onOpenEtherScan}>
                                        Etherscan
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>

            </>
        );
    };

    const showDetails = () => {
        return (
            <>
                <Typography variant="h5">Details</Typography>
                <Typography>Contract Address: {assetContractAddress}</Typography>
                <Typography>Token ID: {tokenId}</Typography>
                <Typography>Token Standard: {tokenStandard}</Typography>
                <Typography>blockchain: {blockchain}</Typography>

            </>
        );
    };

    return (
        <>
            <CommonHeader backButton={'/home'} />

            {asset &&
                <Container className={classes.root}>
                    <Stack spacing={2}>
                        <Box
                            className={classes.assestImage}
                            component="img"
                            alt={asset.name}
                            src={asset.image_url}
                        />

                        {showDescription()}
                        {showTraits()}
                        {showCollectionInfo()}
                        {showDetails()}
                    </Stack>

                </Container>
            }

        </>
    );
};

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});

const useStyles = makeStyles({
    root: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '5vh',
    },
    assestImage: {
        width: 600,
        height: 400
    }
});

export default AssetInfoScreen;
