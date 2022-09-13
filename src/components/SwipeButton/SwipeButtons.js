import React from 'react';
import ReplayIcon from '@material-ui/icons/Replay';
import CloseIcon from '@material-ui/icons/Close';
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';
import { Box, makeStyles } from '@material-ui/core';
import InfoIcon from '@mui/icons-material/Info';

const SwipeButtons = ({
    onRestoreCard,
    onSwipeLeft,
    onSwipeRight,
    onAssetInfo,
}) => {
    const classes = useStyles();

    return (
        <Box className={classes.swipeButtons}>
            <IconButton className={classes.repeat} onClick={() => onRestoreCard()}>
                <ReplayIcon fontSize="large" />
            </IconButton>
            <IconButton className={classes.left} onClick={() => onSwipeLeft()}>
                <CloseIcon fontSize="large" />
            </IconButton>
            <IconButton className={classes.right} onClick={() => onSwipeRight()}>
                <FavoriteIcon fontSize="large" />
            </IconButton>
            <IconButton className={classes.info} onClick={() => onAssetInfo()}>
                <InfoIcon fontSize="large" />
            </IconButton>

        </Box>
    );
};

const useStyles = makeStyles({
    swipeButtons: {
        position: 'fixed',
        bottom: '10vh',
        width: '100%',
        display: 'flex',
        justifyContent: 'space-evenly',
    },
    repeat: {
        padding: '3vw !important',
        color: '#f5b748 !important',
    },
    left: {
        padding: '3vw !important',
        color: '#ec5e6f !important',
    },
    info: {
        padding: '3vw !important',
        color: '#62b4f9 !important',
    },
    right: {
        padding: '3vw !important',
        color: '#76e2b3 !important',
    },
    lightning: {
        padding: '3vw !important',
        color: '#915dd1 !important',
    },
});

export default SwipeButtons;
