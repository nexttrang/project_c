import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import { Box, makeStyles } from '@material-ui/core';
import CircleButton from '../CircleButton/CircleButton';
import iconDislike from '../../assets/images/icon_dislike.webp';
import iconLike from '../../assets/images/icon_like.webp';
import iconRestore from '../../assets/images/icon_restore.webp';
import iconInfo from '../../assets/images/icon_info.webp';

const SwipeButtons = ({
    onRestoreCard,
    onSwipeLeft,
    onSwipeRight,
    onAssetInfo,
}) => {
    const classes = useStyles();

    return (
        <Box className={classes.swipeButtons}>
            <IconButton className={classes.restoreButton} onClick={() => onRestoreCard()}>
                <CircleButton icon={iconRestore} type='smaller' />
            </IconButton>
            <IconButton onClick={() => onSwipeLeft()}>
                <CircleButton icon={iconDislike} />
            </IconButton>
            <IconButton onClick={() => onSwipeRight()}>
                <CircleButton icon={iconLike} />
            </IconButton>
            <IconButton className={classes.infoButton} onClick={() => onAssetInfo()}>
                <CircleButton icon={iconInfo} type='smaller' />
            </IconButton>
        </Box>
    );
};

const useStyles = makeStyles({
    swipeButtons: {
        position: 'absolute',
        bottom: '4vh',
        width: '100%',
        display: 'flex',
        justifyContent: 'space-evenly',
        // border: '1px solid red'
    },
    restoreButton: {
        marginLeft: '23vw'
    },
    infoButton: {
        marginRight: '23vw'
    }
});

export default SwipeButtons;
