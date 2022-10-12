import React from 'react';
import NFTDetailTable from '../../components/NFTDetailTable/NFTDesTable';
import NFTDes from '../../components/NFTDes';
import NFTCollectionInfo from '../../components/NFTCollectionInfo/NFTCollectionInfo';
import LikedCardRow from '../../components/LikedCardPanel/LikedCardRow';

const DebugScreen = () => {

    // const getNFTDetail = () => {
    //     return (
    //         <NFTDetailTable contractAddress='0x3d74...3D7c' contractId='2243' contractStandard='ERC-721' />
    //     );
    // };

    // const getNFTDes = () => {
    //     return (
    //         <NFTDes by='#UNKNOWNUSER' des='Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation.' />
    //     );
    // };

    // const getCollectionInfo = () => {
    //     return (
    //         <NFTCollectionInfo info='Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nismodo.' />
    //     );
    // };

    return (
        <LikedCardRow data={sampleData.data} />
        // <LikedCardContainer />
    );
};

export default DebugScreen;

const sampleData = {
    data: [
        {
            address: '0x2963ba471e265e5f51cafafca78310fe87f8e6d1',
            tokenId: ''
        }, {
            address: '0x2642d04b4efb7d52d85c5b1711fc6b10f3bc4d1c',
            tokenId: ''
        }
    ]
};

{/* <Grid container
spacing={0}
direction="column"
alignItems="center"
justifyContent="center"
style={{ border: '1px solid red', minHeight: '100vh' }}>

<IconButton>
    <AddCircleIcon style={{ width: '10vw', height: '10vw', color: '#fff' }} />
</IconButton>
</Grid> */}