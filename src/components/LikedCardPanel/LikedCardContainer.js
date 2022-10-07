import { Container, Grid, IconButton } from '@material-ui/core';
import React from 'react';
import './LikedCardPanel.css';
import { Stack } from '@mui/material';
import LikedCardRow from './LikedCardRow';
import getter from '../../lib/helper/getter';
import { connect } from 'react-redux';

const LikedCardContainer = (props) => {
    const { likedCards } = props;

    const chunks = getter.chunksOfArray(likedCards.map(card => { return getter.decodeLikedCard(card); }), 2);

    return (
        <Container className='container_likedcardcontainer'>
            <Stack>
                {chunks.map((chunk, index) => (
                    <LikedCardRow key={index} data={chunk} />
                )
                )}
            </Stack>
        </Container>
    );
};

const mapStateToProps = (state) => {
    return {
        likedCards: state.user.data.liked
    };
};

export default connect(mapStateToProps)(LikedCardContainer);