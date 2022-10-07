import React, { useState } from 'react';
import { Button, Grid } from '@material-ui/core';
import { fetchAssests } from '../../lib/services/openseaService';
import { getMyDoc, getMyDocs, setSpecificDoc } from '../../lib/services/firebaseService';

const CrawlingScreen = () => {
    const [openseaRunning, setOpenseaRunning] = useState(false);

    const crawlAssests = (cursor) => {
        fetchAssests(cursor).then(async (response) => {
            const data = response.data;
            const nextCursor = data.next;

            const assets = data.assets;
            // console.log(`assets: ${JSON.stringify(assets)}`);
            const validAssets = assets.filter(asset => { return asset.asset_contract.address && asset.description && asset.asset_contract.payout_address && asset.image_url; });

            console.log(`valid assets: ${JSON.stringify(validAssets)}`);
            console.log(`next: ${nextCursor}`);

            if (validAssets.length <= 0) {
                setTimeout(crawlAssests(nextCursor), 1000);
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
                    // if (!openseaDocs.empty) {

                    // }
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
                    setTimeout(crawlAssests(nextCursor), 1000);
                }
            }
        }).catch(error => {
            console.log(error);
            setTimeout(crawlAssests(''), 10000);
        });
    };

    const onClickOpenSea = () => {
        setOpenseaRunning(!openseaRunning);
        crawlAssests('');
    };

    return (
        <Grid container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ border: '1px solid red', minHeight: '100vh' }}>

            <Button style={{ backgroundColor: '#fff' }} onClick={onClickOpenSea}>{openseaRunning ? 'Crawling' : 'OpenSea'}</Button>
        </Grid>
    );
};

export default CrawlingScreen;
