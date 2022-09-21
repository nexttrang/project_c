import React from 'react';
import './LabelArrowLongButton.css';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const LabelArrowLongButton = (props) => {
    const { icon, label } = props;

    return (
        <div className='icon_frame_label_arrow_long_button'>
            {icon && <img src={icon} className="icon_left_label_arrow_long_button" />}
            <span className='label_inner_label_arrow_long_button'>
                {label}
            </span>
            <ArrowForwardIosIcon style={{ color: 'white' }} />
        </div>
    );
};

export default LabelArrowLongButton;