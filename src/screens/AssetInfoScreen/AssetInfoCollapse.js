import React, { useEffect } from 'react';
import StyledLongButton from '../../components/StyledLongButton';
import iconDescription from '../../assets/images/icon_description.webp';
import iconProperties from '../../assets/images/icon_properties.webp';
import iconCollectionInfo from '../../assets/images/icon_collectioninfo.webp';
import iconDetail from '../../assets/images/icon_detail.webp';
import { Stack } from '@mui/material';
import getter from '../../lib/helper/getter';
import NFTCollectionInfo from '../../components/NFTCollectionInfo';
import NFTDetailTable from '../../components/NFTDetailTable';
import NFTDes from '../../components/NFTDes';
import NFTProperties from '../../components/NFTProperties';

const AssetInfoCollapse = (props) => {
    const { asset, tokenId, traits } = props;

    const blockchainInfo = getter.getBlockchainInfo(asset.asset_contract.schema_name);
    const shortContractAddress = getter.shortText(asset.asset_contract.address);
    const shortContractId = getter.shortText(tokenId);

    useEffect(() => {
        console.log(`trait: ${JSON.stringify(traits)}`);
    }, [traits]);

    const getNFTDetail = () => {
        return (
            <NFTDetailTable contractAddress={shortContractAddress} contractId={shortContractId} contractStandard={blockchainInfo.token_standard} />
        );
    };

    const getNFTDes = () => {
        return (
            <NFTDes by={asset.asset_contract.name} des={asset.description} />
        );
    };

    const getCollectionInfo = () => {
        return (
            <NFTCollectionInfo info={asset.collection.description} image={asset.collection.image_url} payout_address={asset.collection.payout_address} />
        );
    };

    const getProperties = () => {
        return (
            <NFTProperties data={traits} />
        );
    };

    return (
        <Stack >
            <StyledLongButton icon={iconDescription} label={'Description'} type={'expand'} expandContent={getNFTDes()} />
            <StyledLongButton icon={iconProperties} label={'Properties'} type={'expand'} expandContent={getProperties()} />
            <StyledLongButton icon={iconCollectionInfo} label={'Collection Information'} type={'expand'} expandContent={getCollectionInfo()} />
            <StyledLongButton icon={iconDetail} label={'Detail'} type={'expand'} expandContent={getNFTDetail()} />
        </Stack>
    );
};

export default AssetInfoCollapse;
