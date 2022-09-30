import React from 'react';
import CommonHeader from '../../components/Header/CommonHeader';
import AssetInfoContainer from './AssetInfoContainer';

const AssetInfoScreen = () => {
    return (
        <>
            <CommonHeader backButton={'/home'} title={'INFORMATION'} />
            <AssetInfoContainer />
        </>
    );
};

export default AssetInfoScreen;
