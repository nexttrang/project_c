import React from 'react';
import NFTCardContainer from './NFTCardContainer';
import './NFTCardPanel.css';

const NFTCardPanel = (props) => {
    const { datas } = props;

    return (
        <>
            {
                (datas != null && datas.length) && <NFTCardContainer datas={datas} />
            }
        </>
    );
};

export default NFTCardPanel;