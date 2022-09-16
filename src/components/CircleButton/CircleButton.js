import React from 'react';
import './CircleButton.css';

const CircleButton = (props) => {
    const { icon, type } = props;

    const getSizeBG = () => type === 'smaller' ? '97px' : '136.8px';
    const getSizeIcon = () => type === 'smaller' ? '40.9px' : '52.7px';

    return (
        <div className='bg_icon' style={{ width: getSizeBG(), height: getSizeBG() }}>
            {icon && <img src={icon} className="icon_inner" style={{ width: getSizeIcon(), height: getSizeIcon() }} />}
        </div >
    );
};

export default CircleButton;