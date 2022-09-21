import React from 'react';
import './ShortButton.css';
import { Button, makeStyles } from '@material-ui/core';

const ShortButton = (props) => {
    const classes = useStyles();
    const { label, onClick, bgColor } = props;

    return (
        <Button className={classes.button} onClick={onClick} style={{ backgroundColor: bgColor ? bgColor : '#e40b2c' }}>
            <span className='label_inner_short_button'>
                {label}
            </span>
        </Button>
    );
};

const useStyles = makeStyles({
    button: {
        width: '17.8vw',
        height: '3.9vh',
        borderRadius: '20px',
    }
});

export default ShortButton;