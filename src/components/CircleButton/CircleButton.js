import React from 'react';
import './CircleButton.css';

const CircleButton = (props) => {
    const { icon, type } = props;

    const getSizeBG = () => type === 'smaller' ? '50px' : '70px';
    const getSizeIcon = () => type === 'smaller' ? '20px' : '30px';

    return (
        <div className='bg_icon_circle_button' style={{ width: getSizeBG(), height: getSizeBG() }}>
            {icon && <img src={icon} className="icon_inner_circle_button" style={{ width: getSizeIcon(), height: getSizeIcon() }} />}
        </div >
    );
};

export default CircleButton;