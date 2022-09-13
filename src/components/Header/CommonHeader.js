import React from 'react';
import './Header.css';
import PersonIcon from '@material-ui/icons/Person';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { Link } from 'react-router-dom';
import { Box } from '@mui/system';
import Logo from '../../assets/images/logo.png';

const CommonHeader = ({ backButton }) => {

    return (
        <div className="header">
            {backButton ? (
                <Link to={backButton} >
                    <ArrowBackIosIcon fontSize="large" className="header__icon" />
                </Link>
            ) : (
                <IconButton>
                    <PersonIcon fontSize="large" className="header__icon" />
                </IconButton>
            )}
            <Link to="/home">
                <img className="header__logo" src={Logo} alt="tinder's logo" />
            </Link>
            <Box />
        </div>
    );
};

export default CommonHeader;
