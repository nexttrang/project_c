import { Button } from '@material-ui/core';
import React from 'react';
import './LongButton.css';
import iconEdit from '../../assets/images/ic_edit.webp';

const LongButton = (props) => {
    const { label, onClick, editable = true } = props;

    return (
        <Button className='icon_frame_long_button' style={{ borderRadius: 45, textTransform: 'none' }} onClick={onClick}>
            <span className='label_inner_long_button'>
                {label}
            </span>
            {editable && <img src={iconEdit} className="icon_right_long_button" />}
        </Button>
    );
};

export default LongButton;