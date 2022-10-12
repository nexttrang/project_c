import React, { useState } from 'react';
import { Button, Grid } from '@material-ui/core';
import { fetchAssests } from '../../lib/services/openseaService';
import { getMyDoc, getMyDocs, setSpecificDoc } from '../../lib/services/firebaseService';
import { fetchCollections } from '../../lib/services/magicedenService';

const CrawlingScreen = () => {
    const [openseaRunning, setOpenseaRunning] = useState(false);
    const [magicedenRunning, setMagicedenRunning] = useState(false);

    const crawlOpensea = (cursor) => {
        fetchAssests(cursor).then(async (response) => {
            const data = response.data;
            const nextCursor = data.next;

            const assets = data.assets;
            // console.log(`assets: ${JSON.stringify(assets)}`);
            const validAssets = assets.filter(asset => { return asset.asset_contract.address && asset.description && asset.asset_contract.payout_address && asset.image_url; });

            console.log(`valid assets: ${JSON.stringify(validAssets)}`);
            console.log(`next: ${nextCursor}`);

            if (validAssets.length <= 0) {
                setTimeout(crawlOpensea(nextCursor), 1000);
                return;
            }

            for (let i = 0; i < validAssets.length; i++) {
                const asset = validAssets[i];
                let index = 0;

                const docOfAsset = await getMyDoc('opensea', asset.asset_contract.address);
                if (docOfAsset.exists()) {
                    index = docOfAsset.data().index;
                } else {
                    const openseaDocs = await getMyDocs('opensea');
                    index = openseaDocs.docs.length;
                }

                const importData = {
                    id: asset.id,
                    index: index,
                    platform: 'opensea',
                    name: asset.name,
                    description: asset.description,
                    image_url: asset.image_url,
                    token_id: asset.token_id,
                    asset_contract: {
                        address: asset.asset_contract.address
                    }
                };

                await setSpecificDoc('opensea', asset.asset_contract.address, importData);
                // await setSpecificDoc('opensea', 'meta', { count: index });

                if (i >= validAssets.length - 1) {
                    setTimeout(crawlOpensea(nextCursor), 1000);
                }
            }
        }).catch(error => {
            console.log(error);
            setTimeout(crawlOpensea(''), 10000);
        });
    };

    const limitCollections = 200;

    const crawlMagicEden = (cursor) => {
        fetchCollections(cursor).then(async (response) => {
            const data = response.data;
            const nextCursor = cursor + limitCollections;

            const validCollections = data.filter(collection => { return collection.name && collection.description && collection.image; });

            console.log(`magic: ${JSON.stringify(validCollections)}`);

            if (validCollections.length <= 0) {
                setTimeout(crawlMagicEden(nextCursor), 1000);
                return;
            }

            for (let i = 0; i < validCollections.length; i++) {
                const collection = validCollections[i];
                let index = 0;

                const docOfCollection = await getMyDoc('magiceden', collection.symbol);
                if (docOfCollection.exists()) {
                    index = docOfCollection.data().index;
                } else {
                    const magicEdenDocs = await getMyDocs('magiceden');
                    index = magicEdenDocs.docs.length;
                }

                const importData = {
                    id: collection.symbol,
                    index: index,
                    platform: 'magiceden',
                    name: collection.name,
                    description: collection.description,
                    image_url: collection.image,
                };

                await setSpecificDoc('magiceden', collection.symbol, importData);
                // await setSpecificDoc('opensea', 'meta', { count: index });

                if (i >= validCollections.length - 1) {
                    setTimeout(crawlMagicEden(nextCursor), 1000);
                }
            }
        }).catch(error => {
            console.log(error);
            setTimeout(crawlMagicEden(0), 1000);
        });
    };


    const onClickOpenSea = (e) => {
        e.preventDefault();
        setOpenseaRunning(!openseaRunning);
        crawlOpensea('');
    };

    const onClickMagicEden = (e) => {
        e.preventDefault();
        setMagicedenRunning(!magicedenRunning);
        crawlMagicEden(0);
    };

    return (
        <Grid container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="space-around"
            style={{ minHeight: '100vh' }}>

            <Button style={{ backgroundColor: '#fff', border: '1px solid red' }} onClick={onClickOpenSea}>{openseaRunning ? 'Crawling' : 'OpenSea'}</Button>

            <Button style={{ backgroundColor: '#fff', border: '1px solid yellow' }} onClick={onClickMagicEden}>{magicedenRunning ? 'Crawling' : 'Magic Eden'}</Button>
        </Grid>
    );
};

export default CrawlingScreen;
