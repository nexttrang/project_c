import React from 'react';
import './LikedCardPanel.css';
import LikedCardContainer from './LikedCardContainer';
import LikedCardEmptyContainer from './LikedCardEmptyContainer';
import { connect } from 'react-redux';

const LikedCardPanel = (props) => {
    const { likedCards } = props;

    return (
        <>
            {
                (likedCards != null && likedCards.length) ? <LikedCardContainer /> : <LikedCardEmptyContainer />
            }
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        likedCards: state.user.data.liked
    };
};

export default connect(mapStateToProps)(LikedCardPanel);