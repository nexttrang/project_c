import React from 'react';
import PersonIcon from '@material-ui/icons/Person';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
import { Box, makeStyles } from '@material-ui/core';
import SettingsIcon from '@mui/icons-material/Settings';
import Logo from '../../assets/images/logo.png';

const HomeHeader = () => {
    const classes = useStyles();

    return (
        <Box className={classes.header}>
            <IconButton href="/#/user_profile">
                <PersonIcon fontSize="large" className={classes.header__icon} />
            </IconButton>
            <Link to="/home">
                <img className={classes.header__logo} src={Logo} alt="tinder's logo" />
            </Link>
            <IconButton href="/#/setting">
                <SettingsIcon fontSize="large" className={classes.header__icon} />
            </IconButton>
        </Box>
    );
};

const useStyles = makeStyles({
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid #f9f9f9',
    },
    header__icon: {
        padding: 20,
    },
    header__logo: {
        height: 40,
        objectFit: 'contain',
    }
});
export default HomeHeader;
