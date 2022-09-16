import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
import { Box, makeStyles } from '@material-ui/core';
import iconLogo from '../../assets/images/icon_logo.webp';
import iconLogoText from '../../assets/images/icon_logo_text.webp';
import iconMenu from '../../assets/images/icon_menu.webp';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Stack } from '@mui/material';

const HomeHeader = () => {
    const classes = useStyles();

    return (
        <Box className={classes.header}>
            <IconButton href="/#/setting" >
                <img className={classes.icon_menu} src={iconMenu} />
            </IconButton>
            <Link to="/home">
                <Stack direction="row" spacing={1} style={{ alignItems: 'center' }}>
                    <img className={classes.icon_logo} src={iconLogo} />
                    <img className={classes.icon_logo_text} src={iconLogoText} />
                </Stack>
            </Link>
            <IconButton href="/#/user_profile">
                <AccountCircleIcon fontSize="large" className={classes.img_profile_ref} />
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
    icon_logo: {
        width: '7vw',
        height: '5vh',
        objectFit: 'contain',
        flexGrow: 0
    },
    icon_logo_text: {
        width: '17.1vw',
        height: '1.5vh',
        flexGrow: 0,
        objectFit: 'contain',
    },
    icon_menu: {
        width: '4vw',
        height: '2vh',
        marginLeft: '5.5vw',
        objectFit: 'contain',
    },
    img_profile_ref: {
        width: '7.8vw',
        height: '4.4vh',
        marginRight: '5.5vw',
        objectFit: 'contain',
    }
});
export default HomeHeader;
