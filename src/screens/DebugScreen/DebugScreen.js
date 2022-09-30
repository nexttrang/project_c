import React from 'react';
import { Grid } from '@material-ui/core';
import LongLabelChip from '../../components/LongLabelChip';
import iconDescription from '../../assets/images/icon_description.webp';
import iconProperties from '../../assets/images/icon_properties.webp';
import iconCollectionInfo from '../../assets/images/icon_collectioninfo.webp';
import iconDetail from '../../assets/images/icon_detail.webp';
import StyledLongButton from '../../components/StyledLongButton';
import NFTDetailTable from '../../components/NFTDetailTable/NFTDesTable';
import NFTDes from '../../components/NFTDes';
import NFTCollectionInfo from '../../components/NFTCollectionInfo/NFTCollectionInfo';
import RowPropertyCard from '../../components/RowPropertyCard';
import getter from '../../lib/helper/getter';
import CustomLongButton from '../../components/CustomLongButton';

const DebugScreen = (props) => {

    const getNFTDetail = () => {
        return (
            <NFTDetailTable contractAddress='0x3d74...3D7c' contractId='2243' contractStandard='ERC-721' />
        );
    };

    const getNFTDes = () => {
        return (
            <NFTDes by='#UNKNOWNUSER' des='Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation.' />
        );
    };

    const getCollectionInfo = () => {
        return (
            <NFTCollectionInfo info='Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nismodo.' />
        );
    };

    const chunks = getter.chunksOfArray(sampleProperties.data, 3);

    return (
        <Grid container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ border: '1px solid red', minHeight: '100vh' }}>

            <CustomLongButton label='BUY' onClick={() => { alert('This feature is under development'); }} />

            {/* <LongLabelChip label={'Address'} /> */}
            {/* <StyledLongButton icon={iconDescription} label={'Collection Information'} type={'expand'} expandContent={getCollectionInfo()} /> */}
            {/* <LabelArrowLongButton icon={iconProperties} label={'Properties'} type={'expand'} />
        <LabelArrowLongButton icon={iconCollectionInfo} label={'Collection Information'} type={'expand'} />
        <LabelArrowLongButton icon={iconDetail} label={'Detail'} type={'expand'} /> */}

            {/* <PropertyCard title='Armour' trait='Rusted Steel' percent={8} />
        <PropertyCard title='Armour' trait='Rusted Steel' percent={8} />
        <PropertyCard title='Armour' trait='Rusted Steel' percent={8} /> */}

            {/* {chunks.map((chunk, index) => (
                <RowPropertyCard key={index} data={chunk} />
            )
            )} */}

        </Grid>
    );
};

const sampleProperties = {
    data: [
        {
            title: 'Armour',
            trait: 'Rusted Steel',
            percent: 8
        },
        {
            title: 'Background',
            trait: 'Tan',
            percent: 8
        },
        {
            title: 'Class',
            trait: 'Mighty',
            percent: 8
        },
        {
            title: 'Eyes',
            trait: 'Blue Eyes',
            percent: 8
        },
        {
            title: 'Front Item',
            trait: 'No Item',
            percent: 8
        },
        {
            title: 'Headwear',
            trait: 'Leather Cap',
            percent: 8
        }
    ]
};

export default DebugScreen;
