import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
import { Box, makeStyles } from '@material-ui/core';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import './Header.css';

const CommonHeader = (props) => {
    const { title, backButton } = props;

    const classes = useStyles();

    return (
        <Box className={classes.header}>
            <Link to={backButton} >
                <ArrowBackIosIcon className={classes.icon_left} />
            </Link>
            <Box>
                <span className="header_title">
                    {title}
                </span>
            </Box>
            <IconButton className={classes.icon_right}>
            </IconButton>
        </Box>
    );
};

const useStyles = makeStyles({
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '3vh',
    },
    icon_left: {
        width: '4vw',
        height: '2vh',
        marginLeft: '5.5vw',
        objectFit: 'contain',
        color: 'white',
    },
    icon_right: {
        width: '7.8vw',
        height: '4.4vh',
        marginRight: '5.5vw',
        objectFit: 'contain',
    }
});
export default CommonHeader;
