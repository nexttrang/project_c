import { IconButton } from '@material-ui/core';
import React from 'react';
import './LikedCardPanel.css';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Stack } from '@mui/material';

const LikedCardEmptyContainer = (props) => {
    return (
        <Stack style={{ height: '100%', alignContent: 'center', display: 'grid' }}>

            <IconButton href="/#/home">
                <AddCircleIcon style={{ width: '10vw', height: '10vw', color: '#fff' }} />
            </IconButton>

            <span className="bold_text_likedcardpanel">ADD AND REVIEW CARDS YOU LIKED</span>
            <span className="normal_text_likedcardpanel">Review and rate cards you already liked to improve your Discover feed</span>

        </Stack>
    );
};

export default LikedCardEmptyContainer;