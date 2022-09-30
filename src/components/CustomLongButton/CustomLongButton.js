import React from 'react';
import './CustomLongButton.css';
import { Button, makeStyles } from '@material-ui/core';

const CustomLongButton = (props) => {
    const classes = useStyles();
    const { label, onClick, bgColor } = props;

    return (
        <Button className={classes.button} onClick={onClick} style={{ backgroundColor: bgColor ? bgColor : '#36bfff' }}>
            <span className='label_inner_long_button'>
                {label}
            </span>
        </Button>
    );
};

const useStyles = makeStyles({
    button: {
        width: '80vw',
        height: '6vh',
        borderRadius: '40px',
    }
});

export default CustomLongButton;